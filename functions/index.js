const crypto = require('crypto');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

const db = admin.firestore();
const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/;
const LOOKUP_LIMIT = 20;
const LOOKUP_WINDOW_MS = 60 * 1000;

const normalizeUsername = value => String(value || '').trim().toLowerCase();

const invalidArgument = message => {
  throw new functions.https.HttpsError('invalid-argument', message);
};

const requireUsername = value => {
  const username = normalizeUsername(value);
  if (!USERNAME_PATTERN.test(username)) {
    invalidArgument('Username must be 3–20 characters and use only letters, numbers, and underscores.');
  }
  return username;
};

const chargeLookupLimit = async context => {
  const address = context.rawRequest && context.rawRequest.ip
    ? context.rawRequest.ip
    : 'unknown';
  const key = crypto.createHash('sha256')
    .update(address)
    .digest('hex');
  const ref = db.collection('usernameLookupLimits').doc(key);
  const now = Date.now();

  await db.runTransaction(async transaction => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.exists ? snapshot.data() : {};
    const windowStartedAt = data.windowStartedAt || now;
    const count = now - windowStartedAt >= LOOKUP_WINDOW_MS ? 0 : (data.count || 0);

    if (count >= LOOKUP_LIMIT) {
      throw new functions.https.HttpsError(
        'resource-exhausted',
        'Too many username lookups. Please wait a minute and try again.'
      );
    }

    transaction.set(ref, {
      windowStartedAt: count === 0 ? now : windowStartedAt,
      count: count + 1
    });
  });
};

const getProfileUsername = profile => normalizeUsername(
  profile.usernameNormalized || profile.username || profile.userName || profile.Username
);

const findUsernameProfiles = async username => {
  const indexed = await db.collection('usernameIndex').doc(username).get();
  const matches = new Map();
  const identityByEmail = new Map();

  const addMatch = (uid, profile, fallbackKey) => {
    const email = String(profile.email || '').trim().toLowerCase();
    const uidKey = uid ? `uid:${uid}` : null;
    const emailKey = email ? identityByEmail.get(email) : null;
    let key = uidKey || emailKey || `legacy:${fallbackKey}`;
    let current = matches.get(key);

    if (uidKey && emailKey && uidKey !== emailKey) {
      current = matches.get(emailKey);
      matches.delete(emailKey);
    }

    matches.set(key, {
      uid: uid || (current && current.uid) || null,
      profile: current ? { ...current.profile, ...profile } : profile
    });
    if (email) identityByEmail.set(email, key);
  };

  if (indexed.exists && indexed.data().uid) {
    const uid = indexed.data().uid;
    const profile = await db.collection('users').doc(uid).get();
    if (!profile.exists || getProfileUsername(profile.data()) !== username) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The username index is inconsistent with its profile. Contact support.'
      );
    }
    addMatch(uid, profile.data(), uid);
  }

  const legacyProfiles = await db.collection('users').get();
  legacyProfiles.forEach(document => {
    const storedProfile = document.data();
    const profile = {
      ...storedProfile,
      email: storedProfile.email || (
        document.id.includes('@') ? document.id : undefined
      )
    };
    if (getProfileUsername(profile) === username) {
      const uid = profile.uid || document.id;
      addMatch(profile.uid || null, profile, uid || profile.email || document.id);
    }
  });

  return Array.from(matches.values());
};

const translateUnexpectedError = (error, operation) => {
  if (error instanceof functions.https.HttpsError) {
    return error;
  }
  console.error(`${operation} failed`, error);
  if (error.code === 'permission-denied' || error.code === 'firestore/permission-denied') {
    return new functions.https.HttpsError(
      'permission-denied',
      'The username service cannot access its Firestore data. Contact the administrator.'
    );
  }
  if (['unavailable', 'deadline-exceeded', 'network-request-failed'].includes(error.code)) {
    return new functions.https.HttpsError(
      'unavailable',
      'The username service could not reach Firebase. Check the connection and try again.'
    );
  }
  if (error.code === 'auth/user-not-found') {
    return new functions.https.HttpsError(
      'failed-precondition',
      'The profile is not linked to an existing Firebase Authentication account.'
    );
  }
  return new functions.https.HttpsError(
    'internal',
    'The username service could not complete the request. Please try again.'
  );
};

exports.checkUsername = functions.https.onCall(async (data, context) => {
  try {
    const username = requireUsername(data && data.username);
    await chargeLookupLimit(context);
    const matches = await findUsernameProfiles(username);
    return { available: matches.length === 0 };
  } catch (error) {
    throw translateUnexpectedError(error, 'Username availability check');
  }
});

exports.resolveUsername = functions.https.onCall(async (data, context) => {
  try {
    const username = requireUsername(data && data.username);
    await chargeLookupLimit(context);
    const matches = await findUsernameProfiles(username);

    if (!matches.length) {
      throw new functions.https.HttpsError('not-found', 'No account was found for that username.');
    }
    if (matches.length > 1) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'More than one profile uses this username. Contact support to resolve the duplicate.'
      );
    }

    const match = matches[0];
    let email = match.profile.email;
    let authUser = null;
    if (match.uid) {
      try {
        authUser = await admin.auth().getUser(match.uid);
      } catch (error) {
        if (error.code !== 'auth/user-not-found') throw error;
      }
    }
    if (!email && authUser) email = authUser.email;
    if (!email) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The profile is missing an email address. Contact support.'
      );
    }

    try {
      const emailUser = await admin.auth().getUserByEmail(email);
      if (authUser && emailUser.uid !== authUser.uid) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          'The profile email does not match its Firebase Authentication account.'
        );
      }
      return { email: emailUser.email };
    } catch (error) {
      if (error instanceof functions.https.HttpsError) throw error;
      if (error.code === 'auth/user-not-found') {
        throw new functions.https.HttpsError(
          'not-found',
          'No Firebase Authentication account is linked to this username.'
        );
      }
      throw error;
    }
  } catch (error) {
    throw translateUnexpectedError(error, 'Username resolution');
  }
});

exports.createUserProfile = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Sign in before creating a profile.');
    }
    const username = requireUsername(data && data.username);
    const fullName = String(data && data.fullName || '').trim();
    if (!fullName || fullName.length > 80) {
      invalidArgument('Full name must be between 1 and 80 characters.');
    }

    const authUser = await admin.auth().getUser(context.auth.uid);
    if (!authUser.email) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The Firebase Authentication account is missing an email address.'
      );
    }

    const existing = await findUsernameProfiles(username);
    if (existing.some(profile => (
      profile.uid
        ? profile.uid !== context.auth.uid
        : String(profile.profile.email || '').trim().toLowerCase() !== authUser.email.toLowerCase()
    ))) {
      throw new functions.https.HttpsError('already-exists', 'That username is already in use.');
    }

    const profileRef = db.collection('users').doc(context.auth.uid);
    const usernameRef = db.collection('usernameIndex').doc(username);
    await db.runTransaction(async transaction => {
      const [usernameSnapshot, profileSnapshot] = await Promise.all([
        transaction.get(usernameRef),
        transaction.get(profileRef)
      ]);
      const existingUsername = profileSnapshot.exists
        ? getProfileUsername(profileSnapshot.data())
        : '';

      if (usernameSnapshot.exists && usernameSnapshot.data().uid !== context.auth.uid) {
        throw new functions.https.HttpsError('already-exists', 'That username is already in use.');
      }
      if (existingUsername && existingUsername !== username) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          'This account already has a different username profile.'
        );
      }

      transaction.set(profileRef, {
        uid: context.auth.uid,
        email: authUser.email,
        fullName,
        username,
        usernameNormalized: username,
        createdAt: profileSnapshot.exists && profileSnapshot.data().createdAt
          ? profileSnapshot.data().createdAt
          : admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      transaction.set(usernameRef, {
        uid: context.auth.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    return { success: true };
  } catch (error) {
    throw translateUnexpectedError(error, 'User profile creation');
  }
});

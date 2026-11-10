# YapYap

**Connect. Chat. Share. Stay Together.**

YapYap is a responsive messaging app focused on keeping conversations simple and personal.

## Run locally

Requirements: Node.js and npm. Firebase Cloud Functions deploy with the Node.js 22 runtime configured in `functions/package.json`.

1. Install dependencies with `npm install --legacy-peer-deps`.
2. Copy `.env.example` to `.env` and add the Firebase Web app configuration from **Firebase Console → Project settings → Your apps**.
3. In Firebase Authentication, enable **Email/Password** and add `localhost` to **Authorized domains** for local testing.
4. Create a Cloud Firestore database and enable the Cloud Firestore API for the Firebase project.
5. Install the Firebase CLI, select the same Firebase project ID used by `REACT_APP_FIREBASE_PROJECT_ID` in `.env`, and deploy the backend and Firestore rules. Username signup/login will fail until the callable Functions are deployed:
   ```sh
   firebase login
   firebase use --add
   cd functions
   npm install
   cd ..
   firebase deploy --only functions,firestore:rules
   ```
   The callable Functions provide private username-to-email resolution, duplicate checking, and profile creation. Deploy them before testing username signup/login.
6. Run `npm start` and open the local address printed by the development server.

The project keeps the existing Firebase client configuration and accounts. Firebase Web app config is public client configuration; do not put Firebase service-account keys, database credentials, or other server secrets in a React `.env` file.

## Current release

The first YapYap release includes the public landing page, Firebase email/password registration and login, password reset, protected dashboard routing, conversation search/unread filtering, one-to-one Firestore chat history, and responsive chat UI. Signup creates a Firebase Auth session before redirecting to the dashboard. Firebase errors are displayed with their error code and message.

New profiles are stored at `users/{uid}` with `uid`, `email`, `fullName`, `username`, and canonical `usernameNormalized` fields. The trusted callable Functions maintain `usernameIndex/{username}` and resolve legacy profiles case-insensitively; they return only the email for the single requested username, never a list of profiles. Username lookups are rate-limited. Clients cannot list/read the profile or username-index collections, and Firestore rules restrict profile access to its owner. New conversations remain stored in the existing email-keyed chat format.

Existing email-keyed profile documents and Firebase Authentication accounts are not deleted or rewritten. Legacy username lookup compares the trimmed, lowercased values in known username fields (`usernameNormalized`, `username`, `userName`, or `Username`). Duplicate legacy usernames are rejected with an actionable error. Because legacy matching scans user profiles when there is no index entry, migrate legacy usernames to canonical UID-based profiles and `usernameIndex` entries as the account population grows.

The client uses the Firebase 6 namespaced API and a single initialization in `src/firebase.js`. Keep `.env`'s Firebase web configuration pointed at the same project where the callable Functions and Firestore rules are deployed. Never put Admin SDK credentials in the React app; Cloud Functions use their project service identity.

The existing chat data model is Firebase/Firestore, selected to preserve current YapYap accounts. MongoDB/Express/Socket.IO, group conversations, file uploads, notifications, and WebRTC calling are not implemented in this release. The interface does not use mock conversations as a substitute for persisted chat data.

The chat workspace uses the existing Firestore conversation listener for real-time updates. Messages support date separators, in-conversation search, replies, send/read indicators, unread badges, latest-message previews, and a draft-preserving send state. Messages are marked read when the selected conversation is visible at its latest messages. Chat history remains in the existing `chats/{id}.messages` array; it is not migrated. This schema and the deployed rules do not provide safe single-message deletion, and no Firebase Storage or Realtime Database presence service is configured, so message deletion, media uploads, typing indicators, and online/last-seen presence are not exposed as working features.

## Project scripts

- `npm start` — start the development server.
- `npm run build` — create an optimized production build.
- `npm test` — run tests.

The compatibility wrapper in `scripts/run-react-scripts.js` supports this legacy Create React App toolchain on newer Node versions.

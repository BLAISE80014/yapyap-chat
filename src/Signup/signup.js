import { Link } from 'react-router-dom';
import React from 'react';
import { AuthShell } from '../Login/forgotPassword';
import firebase from '../firebase';
import { normalizeUsername } from '../auth/username';

class SignupComponent extends React.Component {
  state = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    showPassword: false,
    submitting: false,
    accountCreated: false,
    error: ''
  };

  submitSignup = async event => {
    event.preventDefault();

    const fullName = this.state.fullName.trim();
    const username = normalizeUsername(this.state.username);
    const email = this.state.email.trim();

    if (!fullName) {
      this.setState({ error: 'Please enter your full name.' });
      return;
    }

    if (!/^[a-z0-9_]{3,20}$/.test(username)) {
      this.setState({
        error: 'Username must be 3–20 characters and use only letters, numbers, and underscores.'
      });
      return;
    }

    if (this.state.password.length < 6) {
      this.setState({
        error: 'Choose a password with at least 6 characters.'
      });
      return;
    }

    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({ error: 'Your passwords do not match.' });
      return;
    }

    this.setState({ error: '', submitting: true });

    let accountCreated = this.state.accountCreated;

    try {
      const auth = firebase.auth();
      const db = firebase.firestore();

      await auth.setPersistence('local');

      let user = null;

      if (accountCreated) {
        user = auth.currentUser;

        if (!user || user.email.toLowerCase() !== email.toLowerCase()) {
          throw new Error(
            'Your account already exists. Please log in with that email before continuing.'
          );
        }
      }

      if (!user) {
        const result = await auth.createUserWithEmailAndPassword(
          email,
          this.state.password
        );

        user = result.user;
        accountCreated = true;

        this.setState({ accountCreated: true });

        await user.updateProfile({
          displayName: fullName
        });
      }

      const usernameRef = db.collection('usernames').doc(username);
      const userRef = db.collection('users').doc(user.uid);

      await db.runTransaction(async transaction => {
        const usernameDoc = await transaction.get(usernameRef);

        if (usernameDoc.exists && usernameDoc.data().uid !== user.uid) {
          const error = new Error(
            'That username is already in use. Choose another one.'
          );
          error.code = 'username/already-exists';
          throw error;
        }

        transaction.set(usernameRef, {
          uid: user.uid,
          username: username
        });

        transaction.set(userRef, {
          uid: user.uid,
          fullName: fullName,
          username: username,
          email: email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      });

      if (!auth.currentUser) {
        throw new Error('Account created, but the login session is missing.');
      }

      this.props.history.replace('/dashboard');

    } catch (error) {
      console.error('Signup error:', error);

      let message = error.message || 'Something went wrong. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Please log in instead.';
      } else if (error.code === 'username/already-exists') {
        message = 'That username is already taken. Please choose another.';
      } else if (error.code === 'permission-denied') {
        message = 'Firestore permissions prevented profile creation. Please check your Firestore security rules.';
      }

      this.setState({
        accountCreated,
        error: accountCreated
          ? `Your account was created, but profile setup is incomplete. ${message} You can retry with another username.`
          : message,
        submitting: false
      });
    }
  };

  render() {
    return (
      <AuthShell>
        <span className='auth-kicker'>YOUR PEOPLE ARE HERE</span>

        <h1>Let’s get you connected.</h1>

        <p className='auth-subtitle'>
          Create your account and bring your conversations together.
        </p>

        <form className='auth-form' onSubmit={this.submitSignup}>

          <label htmlFor='signup-name'>Full name</label>
          <input
            id='signup-name'
            autoComplete='name'
            required
            maxLength='80'
            placeholder='How should we call you?'
            value={this.state.fullName}
            onChange={event => this.setState({ fullName: event.target.value })}
          />

          <label htmlFor='signup-username'>Username</label>
          <input
            id='signup-username'
            autoComplete='username'
            required
            minLength='3'
            maxLength='20'
            pattern='[A-Za-z0-9_]{3,20}'
            placeholder='Choose a username'
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
          />

          <label htmlFor='signup-email'>Email address</label>
          <input
            id='signup-email'
            type='email'
            autoComplete='email'
            required
            placeholder='you@example.com'
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
          />

          <label htmlFor='signup-password'>Password</label>
          <div className='password-field'>
            <input
              id='signup-password'
              type={this.state.showPassword ? 'text' : 'password'}
              autoComplete='new-password'
              required
              minLength='6'
              placeholder='At least 6 characters'
              value={this.state.password}
              onChange={event => this.setState({ password: event.target.value })}
            />

            <button
              type='button'
              className='password-toggle'
              onClick={() => this.setState({
                showPassword: !this.state.showPassword
              })}
              aria-label={this.state.showPassword ? 'Hide password' : 'Show password'}
            >
              {this.state.showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <label htmlFor='signup-password-confirmation'>
            Confirm password
          </label>

          <input
            id='signup-password-confirmation'
            type={this.state.showPassword ? 'text' : 'password'}
            autoComplete='new-password'
            required
            placeholder='Enter it once more'
            value={this.state.passwordConfirmation}
            onChange={event => this.setState({
              passwordConfirmation: event.target.value
            })}
          />

          {this.state.error && (
            <div className='form-error' role='alert'>
              {this.state.error}
            </div>
          )}

          <button
            className='button button-primary button-full'
            disabled={this.state.submitting}
          >
            {this.state.submitting
              ? 'Creating your account…'
              : 'Create account'}

            {!this.state.submitting && (
              <span aria-hidden='true'>→</span>
            )}
          </button>
        </form>

        <div className='auth-bottom'>
          Already have an account? <Link to='/login'>Log in</Link>
        </div>
      </AuthShell>
    );
  }
}

export default SignupComponent;
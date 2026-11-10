import { Link } from 'react-router-dom';
import React from 'react';
import { AuthShell } from './forgotPassword';
import firebase from '../firebase';

class LoginComponent extends React.Component {
  state = {
    identifier: '',
    password: '',
    showPassword: false,
    rememberMe: true,
    error: '',
    submitting: false
  };

  submitLogin = async event => {
    event.preventDefault();

    this.setState({ error: '', submitting: true });

    try {
      const auth = firebase.auth();

      await auth.setPersistence(
        this.state.rememberMe ? 'local' : 'session'
      );

      const email = this.state.identifier.trim();

      if (!email.includes('@')) {
        throw new Error(
          'Please enter your email address. Username login is not available yet.'
        );
      }

      const result = await auth.signInWithEmailAndPassword(
        email,
        this.state.password
      );

      if (!result.user || !auth.currentUser) {
        throw new Error(
          'Firebase sign-in completed without an authenticated user.'
        );
      }

      const destination =
        this.props.location.state &&
        this.props.location.state.from;

      this.props.history.replace(
        destination ? destination.pathname : '/dashboard'
      );

    } catch (error) {
      console.error('Sign-in failed:', error);

      let message = error.message || 'Unable to sign in. Please try again.';

      if (error.code === 'auth/user-not-found') {
        message = 'No account was found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      } else if (error.code === 'auth/invalid-credential') {
        message = 'Incorrect email or password.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many attempts. Please try again later.';
      }

      this.setState({
        error: message,
        submitting: false
      });
    }
  };

  render() {
    return (
      <AuthShell>
        <span className='auth-kicker'>WELCOME BACK</span>

        <h1>Good to see you.</h1>

        <p className='auth-subtitle'>
          Your conversations are right where you left them.
        </p>

        <form className='auth-form' onSubmit={this.submitLogin}>

          <label htmlFor='login-identifier'>Email address</label>

          <input
            id='login-identifier'
            type='email'
            autoComplete='email'
            autoFocus
            required
            placeholder='you@example.com'
            value={this.state.identifier}
            onChange={event => this.setState({
              identifier: event.target.value
            })}
          />

          <div className='label-row'>
            <label htmlFor='login-password'>Password</label>

            <Link to='/forgot-password'>
              Forgot password?
            </Link>
          </div>

          <div className='password-field'>
            <input
              id='login-password'
              type={this.state.showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              required
              placeholder='Enter your password'
              value={this.state.password}
              onChange={event => this.setState({
                password: event.target.value
              })}
            />

            <button
              type='button'
              className='password-toggle'
              onClick={() => this.setState({
                showPassword: !this.state.showPassword
              })}
              aria-label={
                this.state.showPassword ? 'Hide password' : 'Show password'
              }
            >
              {this.state.showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <label className='check-row'>
            <input
              type='checkbox'
              checked={this.state.rememberMe}
              onChange={event => this.setState({
                rememberMe: event.target.checked
              })}
            />

            <span>Remember me</span>
          </label>

          {this.state.error && (
            <div className='form-error' role='alert'>
              {this.state.error}
            </div>
          )}

          <button
            className='button button-primary button-full'
            disabled={this.state.submitting}
          >
            {this.state.submitting ? 'Signing in…' : 'Log in'}

            {!this.state.submitting && (
              <span aria-hidden='true'>→</span>
            )}
          </button>
        </form>

        <div className='auth-bottom'>
          New to YapYap? <Link to='/signup'>Create an account</Link>
        </div>
      </AuthShell>
    );
  }
}

export default LoginComponent;
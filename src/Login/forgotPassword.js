import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import ThemeToggle from '../components/ThemeToggle';

class ForgotPasswordComponent extends React.Component {
  state = { email: '', message: '', error: '', submitting: false };

  submit = async event => {
    event.preventDefault();
    this.setState({ message: '', error: '', submitting: true });

    try {
      await firebase.auth().sendPasswordResetEmail(this.state.email.trim());
      this.setState({
        message: 'If an account exists for that email, a password reset link is on its way.',
        submitting: false
      });
    } catch (error) {
      const code = error.code || 'auth/unknown';
      const message = error.message || 'No error message was provided.';
      console.error(`Password reset failed (${code}): ${message}`);
      this.setState({ error: `Firebase ${code}: ${message}`, submitting: false });
    }
  };

  render() {
    return (
      <AuthShell>
        <span className='auth-kicker'>ACCOUNT RECOVERY</span>
        <h1>Reset your password</h1>
        <p className='auth-subtitle'>We’ll email you a secure link to get back into your account.</p>
        <form className='auth-form' onSubmit={this.submit}>
          <label htmlFor='reset-email'>Email address</label>
          <input id='reset-email' type='email' required autoComplete='email' placeholder='you@example.com'
            value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
          {this.state.error && <div className='form-error' role='alert'>{this.state.error}</div>}
          {this.state.message && <div className='form-success' role='status'>{this.state.message}</div>}
          <button className='button button-primary button-full' disabled={this.state.submitting}>
            {this.state.submitting ? 'Sending link…' : 'Send reset link'}
          </button>
        </form>
        <div className='auth-bottom'><Link to='/login'>← Back to log in</Link></div>
      </AuthShell>
    );
  }
}

export function AuthShell({ children }) {
  return (
    <main className='auth-page'>
      <aside className='auth-aside'>
        <Link to='/' className='brand-lockup' aria-label='YapYap home'>
          <img className='brand-logo-image' src={`${process.env.PUBLIC_URL}/yapyap-chat-icon.png`} alt='' />
          <span>yapyap</span>
        </Link>
        <div className='auth-aside-copy'>
          <span className='eyebrow'>GOOD CONVERSATIONS START HERE</span>
          <h2>Make room for <span>your people.</span></h2>
          <p>Connect. Chat. Share. Stay Together.</p>
          <div className='auth-bubbles'><span>Hey, you! <span role='img' aria-label='waving'>👋</span></span><span>Good to hear from you</span></div>
        </div>
        <span className='auth-aside-foot'>A little closer, every day.</span>
      </aside>
      <section className='auth-main'>
        <ThemeToggle />
        <div className='auth-card'>{children}</div>
      </section>
    </main>
  );
}

export default ForgotPasswordComponent;

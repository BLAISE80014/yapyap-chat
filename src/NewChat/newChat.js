import React from 'react';
import firebase from '../firebase';

class NewChatComponent extends React.Component {
  state = { username: '', message: '', error: '', submitting: false };

  componentDidMount() {
    if (!firebase.auth().currentUser) {
      this.props.history.replace('/login');
    }
  }

  submitNewChat = async event => {
    event.preventDefault();
    const username = this.state.username.trim().toLowerCase();
    if (!username || !this.state.message.trim()) return;

    this.setState({ error: '', submitting: true });
    try {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        this.props.history.replace('/login');
        return;
      }
      if (username === currentUser.email.toLowerCase()) {
        this.setState({ error: 'Choose someone else — you can’t start a chat with yourself.', submitting: false });
        return;
      }

      const docKey = this.buildDocKey(username);
      const conversation = await firebase.firestore().collection('chats').doc(docKey).get();
      if (conversation.exists) {
        this.props.goToChatFn(docKey, this.state.message.trim());
      } else {
        this.props.newChatSubmitFn({ sendTo: username, message: this.state.message.trim() });
      }
    } catch (error) {
      const code = error.code || 'firestore/unknown';
      const message = error.message || 'No error message was provided.';
      console.error(`Starting a conversation failed (${code}): ${message}`);
      this.setState({ error: `Firebase ${code}: ${message}`, submitting: false });
    }
  };

  buildDocKey = recipient => [firebase.auth().currentUser.email, recipient].sort().join(':');

  render() {
    return (
      <div className='new-chat-overlay'>
        <form className='new-chat-card' onSubmit={this.submitNewChat}>
          <span className='auth-kicker'>MAKE A CONNECTION</span>
          <h2>Start a conversation</h2>
          <p>Find someone already on YapYap and send the first hello.</p>
          <label htmlFor='new-chat-email'>Their email address</label>
          <input id='new-chat-email' type='email' required autoFocus autoComplete='email'
            placeholder='friend@example.com' value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })} />
          <label htmlFor='new-chat-message'>Your first message</label>
          <input id='new-chat-message' required maxLength='2000' placeholder='Say hello…'
            value={this.state.message}
            onChange={event => this.setState({ message: event.target.value })} />
          {this.state.error && <div className='form-error' role='alert'>{this.state.error}</div>}
          <button type='submit' className='button button-primary' disabled={this.state.submitting}>
            {this.state.submitting ? 'Sending…' : 'Send message'} <span aria-hidden='true'>→</span>
          </button>
          <button type='button' className='cancel-chat' onClick={this.props.onCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default NewChatComponent;

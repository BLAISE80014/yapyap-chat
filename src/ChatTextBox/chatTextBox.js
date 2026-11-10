import React from 'react';

class ChatTextBoxComponent extends React.Component {
  state = { chatText: '', submitting: false, error: '' };

  submitMessage = async event => {
    if (event) event.preventDefault();
    const message = this.state.chatText.trim();
    if (!message || this.state.submitting) return;

    this.setState({ submitting: true, error: '' });
    try {
      const sent = await this.props.submitMessageFn(message, this.props.replyTo);
      if (sent) {
        this.setState({ chatText: '', error: '' });
      } else {
        this.setState({ error: 'Message was not sent. Your draft is still here; try again.' });
      }
    } catch (error) {
      this.setState({ error: error.message || 'Message was not sent. Your draft is still here; try again.' });
    } finally {
      this.setState({ submitting: false });
    }
  };

  handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitMessage();
    }
  };

  render() {
    return (
      <form className='chat-composer' onSubmit={this.submitMessage}>
        {this.props.replyTo &&
          <div className='composer-reply-preview'>
            <span><strong>Replying to {this.props.replyTo.sender === this.props.userEmail ? 'yourself' : this.props.replyTo.senderName}</strong>{this.props.replyTo.message}</span>
            <button type='button' aria-label='Cancel reply' onClick={this.props.onCancelReply}>×</button>
          </div>
        }
        <textarea
          aria-label='Type a message'
          placeholder='Write a message…'
          rows='1'
          maxLength='4000'
          value={this.state.chatText}
          disabled={this.state.submitting}
          onChange={event => this.setState({ chatText: event.target.value })}
          onKeyDown={this.handleKeyDown}
        />
        <span className='composer-hint'>Enter to send · Shift + Enter for a new line</span>
        {this.state.error && <span className='composer-error' role='alert'>{this.state.error}</span>}
        <button type='submit' className='composer-send' disabled={!this.state.chatText.trim() || this.state.submitting} aria-label='Send message'>
          {this.state.submitting ? '…' : '↑'}
        </button>
      </form>
    );
  }
}

export default ChatTextBoxComponent;

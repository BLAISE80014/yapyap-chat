import React from 'react';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import {
  formatDayLabel,
  formatMessageTime,
  getLastMessageKey,
  getMessageKey,
  messageDayKey
} from './chatUtils';

class ChatViewComponent extends React.Component {
  state = { searchOpen: false, searchTerm: '' };

  componentDidMount() {
    this.scrollToLatest();
  }

  getSnapshotBeforeUpdate(previousProps) {
    if (!previousProps.chat || !this.props.chat || previousProps.chat.id !== this.props.chat.id) {
      return true;
    }

    if (getLastMessageKey(previousProps.chat) === getLastMessageKey(this.props.chat)) {
      return false;
    }

    const container = this.messages;
    const nearBottom = container
      && container.scrollHeight - container.scrollTop - container.clientHeight < 140;
    const messages = Array.isArray(this.props.chat.messages) ? this.props.chat.messages : [];
    const latestMessage = messages[messages.length - 1];
    return nearBottom || (latestMessage && latestMessage.sender === this.props.user);
  }

  componentDidUpdate(previousProps, previousState, shouldScroll) {
    if (shouldScroll) this.scrollToLatest();
  }

  scrollToLatest = () => {
    if (this.messages) {
      this.messages.scrollTop = this.messages.scrollHeight;
    }
  };

  replyToMessage = (message, index) => {
    this.props.onReplyMessage({
      id: getMessageKey(message, index),
      message: message.message || '',
      sender: message.sender,
      senderName: message.sender === this.props.user
        ? 'You'
        : String(message.sender || 'Contact').split('@')[0]
    });
  };

  render() {
    const { chat, user } = this.props;
    if (!chat) {
      return (
        <div className='chat-empty-state'>
          <div className='empty-chat-illustration'><img className='brand-logo-image' src={`${process.env.PUBLIC_URL}/yapyap-chat-icon.png`} alt='' /><i>✦</i></div>
          <h2>A little closer starts here.</h2>
          <p>Pick a conversation or start a new one to say hello.</p>
        </div>
      );
    }

    const users = Array.isArray(chat.users) ? chat.users : [];
    const messages = Array.isArray(chat.messages) ? chat.messages : [];
    const friend = users.find(person => person !== user) || 'Conversation';
    const initial = friend.slice(0, 1).toUpperCase();
    const visibleMessages = messages
      .map((message, index) => ({ message, index }))
      .filter(({ message }) => (
        !this.state.searchTerm
        || String(message.message || '').toLowerCase().includes(this.state.searchTerm.toLowerCase())
      ));

    return (
      <div className='chat-view'>
        <header className='chat-view-header'>
          <span className='contact-avatar contact-color-2'>{initial}</span>
          <div className='chat-contact-info'><strong>{friend.split('@')[0]}</strong><span>YapYap conversation</span></div>
          <div className='chat-header-actions'>
            <button type='button' className='mobile-chat-back' aria-label='Back to conversations' onClick={this.props.onBack}>←</button>
            <button type='button' aria-label='Search messages' title='Search messages' onClick={() => this.setState({ searchOpen: !this.state.searchOpen, searchTerm: '' })}><SearchOutlined /></button>
          </div>
        </header>
        {this.state.searchOpen &&
          <div className='message-search-bar'>
            <SearchOutlined />
            <input autoFocus aria-label='Search messages in this conversation' placeholder='Find a message…'
              value={this.state.searchTerm} onChange={event => this.setState({ searchTerm: event.target.value })} />
            {this.state.searchTerm && <span className='message-search-count'>{visibleMessages.length} found</span>}
            <button type='button' onClick={() => this.setState({ searchOpen: false, searchTerm: '' })}>Done</button>
          </div>
        }
        <main className='chat-messages' ref={node => { this.messages = node; }} aria-live='polite'>
          {!messages.length && <div className='conversation-start'><span>THIS IS THE BEGINNING OF YOUR CONVERSATION</span></div>}
          {this.state.searchTerm && !visibleMessages.length && <p className='message-search-empty'>No messages match your search.</p>}
          {visibleMessages.map(({ message, index }, visibleIndex) => {
            const previous = visibleMessages[visibleIndex - 1];
            const showDate = !previous
              || messageDayKey(previous.message.timestamp) !== messageDayKey(message.timestamp);
            const outgoing = message.sender === user;
            const isLatest = index === messages.length - 1;
            const messageKey = getMessageKey(message, index);
            return (
              <React.Fragment key={messageKey}>
                {showDate && <div className='message-date-separator'><span>{formatDayLabel(message.timestamp)}</span></div>}
                <div className={`message-row ${outgoing ? 'message-row-out' : 'message-row-in'}`}>
                  {!outgoing && <span className='message-avatar contact-avatar contact-color-2'>{initial}</span>}
                  <div className={`message-bubble ${outgoing ? 'message-bubble-out' : ''}`}>
                    {message.replyTo && <div className='message-reply-quote'><strong>{message.replyTo.sender === user ? 'You' : String(message.replyTo.sender || 'Contact').split('@')[0]}</strong><span>{message.replyTo.message}</span></div>}
                    <p>{message.message}</p>
                    <div className='message-meta'>
                      <time>{formatMessageTime(message.timestamp)}</time>
                      {outgoing && <span className={`message-delivery ${isLatest && chat.receiverHasRead ? 'message-read' : ''}`} aria-label={isLatest && chat.receiverHasRead ? 'Read' : 'Sent'}>{isLatest && chat.receiverHasRead ? '✓✓' : '✓'}</span>}
                    </div>
                  </div>
                  <button type='button' className='message-reply-button' aria-label='Reply to message'
                    onClick={() => this.replyToMessage(message, index)}>↩</button>
                </div>
              </React.Fragment>
            );
          })}
        </main>
        <div className='chat-composer-slot'>{React.isValidElement(this.props.children)
          ? React.cloneElement(this.props.children, { userEmail: user })
          : this.props.children}
        </div>
      </div>
    );
  }
}

export default ChatViewComponent;

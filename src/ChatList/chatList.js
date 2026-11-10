import React from 'react';

class ChatListComponent extends React.Component {
  render() {
    const { chats, userEmail, selectedChatId } = this.props;

    if (this.props.loading) {
      return <div className='chat-list-status' role='status'>Loading conversations…</div>;
    }

    if (chats.length === 0) {
      return (
        <div className='chat-list-empty'>
          <span className='empty-inbox-icon'>✳</span>
          <strong>No conversations yet</strong>
          <span>Start a new chat to say hello.</span>
          <button type='button' onClick={this.newChat}>Start a conversation</button>
        </div>
      );
    }

    return (
      <div className='chat-list-items'>
        {chats.map((chat, index) => {
          const users = Array.isArray(chat.users) ? chat.users : [];
          const messages = Array.isArray(chat.messages) ? chat.messages : [];
          const friend = users.find(user => user !== userEmail) || 'Unknown';
          const lastMessage = messages[messages.length - 1] || {};
          const unread = chat.receiverHasRead === false && lastMessage.sender !== userEmail;
          const initials = friend.slice(0, 1).toUpperCase();
          return (
            <button type='button' key={chat.id}
              onClick={() => this.props.selectChatFn(chat)}
              className={`chat-list-item ${chat.id === selectedChatId ? 'chat-list-item-active' : ''}`}
              aria-current={chat.id === selectedChatId ? 'page' : undefined}>
              <span className={`contact-avatar contact-color-${index % 5}`}>{initials}</span>
              <span className='chat-list-copy'>
                <span className='chat-list-title'><strong>{friend.split('@')[0]}</strong><time>{this.formatTime(lastMessage.timestamp)}</time></span>
                <span className='chat-list-preview'>
                  <span>{lastMessage.sender === userEmail ? 'You: ' : ''}{lastMessage.message || (lastMessage.imageUrl ? 'Photo' : 'Start a conversation')}</span>
                  {unread && <i className='unread-count' aria-label='Unread message'>1</i>}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  formatTime = timestamp => {
    if (!timestamp) return '';
    const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
    if (Number.isNaN(date.getTime())) return '';
    return date.toDateString() === new Date().toDateString()
      ? date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  newChat = () => this.props.newChatBtnFn();
}

export default ChatListComponent;

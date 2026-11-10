import React from 'react';
import NewChatComponent from '../NewChat/newChat';
import ChatListComponent from '../ChatList/chatList';
import ChatViewComponent from '../ChatView/chatView';
import ChatTextBoxComponent from '../ChatTextBox/chatTextBox';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import GroupOutlined from '@material-ui/icons/GroupOutlined';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import Add from '@material-ui/icons/Add';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ThemeToggle from '../components/ThemeToggle';
import firebase from '../firebase';
import { getLastMessageTime } from '../ChatView/chatUtils';

class DashboardComponent extends React.Component {

  constructor(props) {
    super(props);
    this.readingChats = new Set();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      friends: [],
      chats: [],
      chatsLoaded: false,
      chatError: '',
      chatFilter: '',
      unreadOnly: false,
      chatOpen: false,
      replyTo: null
    };
  }

  render() {

    const activeChat = this.state.chats.find(chat => chat.id === this.state.selectedChat);

    if(this.state.email) {
      return(
        <div className={`yapyap-dashboard ${this.state.chatOpen ? 'chat-open' : ''}`} id='dashboard-container'>
          <aside className='app-rail'>
            <a href='/' className='rail-brand' aria-label='YapYap home'><img className='rail-brand-icon' src={`${process.env.PUBLIC_URL}/yapyap-chat-icon.png`} alt='' /><span className='rail-brand-name'>YapYap</span></a>
            <div className='rail-account'>
              <span className='rail-avatar'>{(this.props.user.displayName || this.state.email).charAt(0).toUpperCase()}<i /></span>
              <span><strong>{this.props.user.displayName || 'YapYap user'}</strong><small>Online</small></span>
            </div>
            <label className='rail-search'>
              <SearchOutlined />
              <input aria-label='Search conversations' placeholder='Search conversations'
                value={this.state.chatFilter}
                onChange={event => this.setState({ chatFilter: event.target.value })} />
            </label>
            <span className='rail-section-label'>MESSAGES</span>
            <button type='button' className={`rail-button ${!this.state.unreadOnly ? 'rail-active' : ''}`} title='All chats' aria-label='All chats' onClick={() => this.setState({ unreadOnly: false, chatError: '' })}><ChatBubbleOutline /><span>All Chats</span></button>
            <button type='button' className={`rail-button ${this.state.unreadOnly ? 'rail-active' : ''}`} title='Unread' aria-label='Unread' onClick={() => this.setState({ unreadOnly: true, chatError: '' })}><span className='rail-unread-icon'>●</span><span>Unread</span></button>
            <button type='button' className='rail-button' title='Favorites' aria-label='Favorites' onClick={() => this.setState({ chatError: 'Favorites are not set up for this account yet.' })}><span className='rail-text-icon'>☆</span><span>Favorites</span></button>
            <button type='button' className='rail-button' title='Groups' aria-label='Groups' onClick={() => this.setState({ chatError: 'Group conversations are not available in this release.' })}><GroupOutlined /><span>Groups</span></button>
            <button type='button' className='rail-button' title='Contacts' aria-label='Contacts' onClick={() => this.setState({ chatError: 'Start a conversation with someone by selecting New Message.' })}><span className='rail-text-icon'>♙</span><span>Contacts</span></button>
            <button type='button' className='rail-button' title='Stories' aria-label='Stories' onClick={() => this.setState({ chatError: 'Stories are not available in this release.' })}><span className='rail-text-icon'>◉</span><span>Stories</span></button>
            <button type='button' className='rail-button' title='Notifications' aria-label='Notifications' onClick={() => this.setState({ chatError: 'You are all caught up.' })}><span className='rail-text-icon'>♧</span><span>Notifications</span></button>
            <span className='rail-spacer' />
            <button type='button' className='rail-button' title='Settings' aria-label='Settings' onClick={() => this.setState({ chatError: 'Profile and settings are not available in this release.' })}><SettingsOutlined /><span>Settings</span></button>
            <ThemeToggle />
            <button type='button' className='rail-button rail-logout' title='Log out' aria-label='Log out' onClick={this.signOut}><ExitToApp /><span>Log out</span></button>
          </aside>

          <section className='conversation-panel'>
            <div className='conversation-heading'>
              <div><span className='panel-kicker'>YOUR SPACE</span><h1>Chats</h1></div>
              <button type='button' className='new-chat-button' onClick={this.newChatBtnClicked} title='New conversation' aria-label='New conversation'><Add /></button>
            </div>
            {this.state.chatError && <div className='chat-notice' role='alert'>{this.state.chatError}</div>}
            <ChatListComponent
              userEmail={this.state.email}
              selectChatFn={this.selectChat}
              loading={!this.state.chatsLoaded}
              chats={this.state.chats.filter(chat => {
                const users = Array.isArray(chat.users) ? chat.users : [];
                const messages = Array.isArray(chat.messages) ? chat.messages : [];
                const friend = users.find(user => user !== this.state.email) || '';
                const lastMessage = messages[messages.length - 1] || {};
                const filter = this.state.chatFilter.toLowerCase();
                const matches = friend.toLowerCase().includes(filter)
                  || String(lastMessage.message || '').toLowerCase().includes(filter);
                return matches && (!this.state.unreadOnly || (chat.receiverHasRead === false && !this.userIsSender(chat)));
              })}
              selectedChatId={this.state.selectedChat}
              newChatBtnFn={this.newChatBtnClicked} />
          </section>

          <section className='chat-stage'>
            {this.state.newChatFormVisible ?
              <NewChatComponent history={this.props.history} goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit} onCancel={this.closeNewChat} /> :
              <ChatViewComponent user={this.state.email} chat={activeChat} onBack={this.closeChat}
                onChatRead={this.messageRead}
                onReplyMessage={replyTo => this.setState({ replyTo })}>
                {activeChat && <ChatTextBoxComponent replyTo={this.state.replyTo}
                  onCancelReply={() => this.setState({ replyTo: null })}
                  submitMessageFn={this.submitMessage} />}
              </ChatViewComponent>
            }
          </section>
        </div>
      );
    } else {
      return(<div role='status'>Loading your chat dashboard...</div>);
    }
  }

  signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      const code = error.code || 'auth/unknown';
      const message = error.message || 'No error message was provided.';
      console.error(`Failed to sign out (${code}): ${message}`);
      this.setState({ chatError: `Firebase ${code}: ${message}` });
    }
  };

  submitMessage = async (msg, replyTo) => {
    const message = String(msg || '').trim();
    const user = firebase.auth().currentUser;
    const chat = this.state.chats.find(item => item.id === this.state.selectedChat);
    if (!this.state.selectedChat || !message || message.length > 4000
      || !user || user.email !== this.state.email
      || !chat || !Array.isArray(chat.users) || !chat.users.includes(user.email)) {
      this.setState({ chatError: 'Could not send this message. Check the conversation and try again.' });
      return false;
    }

    try {
      const timestamp = Date.now();
      await firebase.firestore().collection('chats').doc(this.state.selectedChat).update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          id: `${timestamp}-${Math.random().toString(36).slice(2, 9)}`,
          sender: user.email,
          message,
          timestamp,
          ...(replyTo ? { replyTo: {
            id: replyTo.id,
            message: replyTo.message,
            sender: replyTo.sender
          } } : {})
        }),
        receiverHasRead: false
      });
      this.setState({ chatError: '', replyTo: null });
      return true;
    } catch (error) {
      const code = error.code || 'firestore/unknown';
      const message = error.message || 'No error message was provided.';
      console.error(`Message send failed (${code}): ${message}`);
      this.setState({ chatError: `Firebase ${code}: ${message}` });
      return false;
    }
  }

  buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

  newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null, chatOpen: true });

  closeNewChat = () => this.setState({ newChatFormVisible: false, chatOpen: false });

  closeChat = () => this.setState({ chatOpen: false });

  newChatSubmit = async chatObj => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    try {
      const currentUser = firebase.auth().currentUser;
      const message = String(chatObj.message || '').trim();
      if (!currentUser || currentUser.email !== this.state.email
        || !message || message.length > 4000
        || !chatObj.sendTo || chatObj.sendTo === currentUser.email) {
        throw new Error('The conversation details are invalid. Please check the recipient and message.');
      }
      const timestamp = Date.now();
      await firebase.firestore().collection('chats').doc(docKey).set({
          messages: [{
            id: `${timestamp}-${Math.random().toString(36).slice(2, 9)}`,
            message,
            sender: currentUser.email,
            timestamp
          }],
          users: [currentUser.email, chatObj.sendTo],
          receiverHasRead: false
        });
      this.setState({ newChatFormVisible: false, selectedChat: docKey, chatOpen: true, replyTo: null, chatError: '' });
    } catch (error) {
      const code = error.code || 'firestore/unknown';
      const message = error.message || 'No error message was provided.';
      console.error(`Conversation creation failed (${code}): ${message}`);
      this.setState({ chatError: `Firebase ${code}: ${message}` });
    }
  }

  selectChat = (chat) => {
    this.setState({ selectedChat: chat.id, newChatFormVisible: false, chatOpen: true, replyTo: null });
  }

  goToChat = (docKey, msg) => {
    this.setState({ selectedChat: docKey, newChatFormVisible: false, chatOpen: true, replyTo: null }, () => this.submitMessage(msg));
  }

  messageRead = (chat) => {
    if (!chat || chat.receiverHasRead || !Array.isArray(chat.messages)
      || !chat.messages.length || this.userIsSender(chat)
      || document.visibilityState === 'hidden' || this.readingChats.has(chat.id)) {
      return;
    }

    this.readingChats.add(chat.id);
    firebase.firestore().collection('chats').doc(chat.id).update({ receiverHasRead: true })
      .catch(error => {
        const code = error.code || 'firestore/unknown';
        const message = error.message || 'No error message was provided.';
        console.error(`Marking conversation read failed (${code}): ${message}`);
        this.setState({ chatError: `Firebase ${code}: ${message}` });
      })
      .finally(() => {
        this.readingChats.delete(chat.id);
      });
  }

  userIsSender = chat => {
    const messages = Array.isArray(chat && chat.messages) ? chat.messages : [];
    return messages.length > 0 && messages[messages.length - 1].sender === this.state.email;
  };

  componentDidMount = () => {
    const user = this.props.user || firebase.auth().currentUser;
    if (!user) {
      this.props.history.replace('/login');
      return;
    }

    this.setState({ email: user.email });
    this.unsubscribeChats = firebase
      .firestore()
      .collection('chats')
      .where('users', 'array-contains', user.email)
      .onSnapshot(
        res => {
          const chats = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          chats.sort((first, second) => {
            return getLastMessageTime(second) - getLastMessageTime(first);
          });
          this.setState({ chats, chatsLoaded: true, chatError: '' });
        },
        error => {
          const code = error.code || 'firestore/unknown';
          const message = error.message || 'No error message was provided.';
          console.error(`Failed to load chats (${code}): ${message}`);
          this.setState({ chatError: `Firebase ${code}: ${message}`, chatsLoaded: true });
        }
      );
  }

  componentWillUnmount() {
    if (this.unsubscribeChats) {
      this.unsubscribeChats();
    }
  }
}

export default DashboardComponent;
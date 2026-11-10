jest.mock('../firebase', () => {
  const firebase = {
    auth: jest.fn(),
    firestore: jest.fn()
  };
  firebase.firestore.FieldValue = {
    arrayUnion: jest.fn(value => value)
  };
  return { __esModule: true, default: firebase };
});

import DashboardComponent from './dashboard';
import firebase from '../firebase';

const createDashboard = () => {
  const dashboard = new DashboardComponent({
    user: { email: 'me@example.com', displayName: 'Me' },
    history: { replace: jest.fn() }
  });
  dashboard.state = {
    ...dashboard.state,
    email: 'me@example.com',
    selectedChat: 'me@example.com:you@example.com',
    chats: [{
      id: 'me@example.com:you@example.com',
      users: ['me@example.com', 'you@example.com'],
      messages: [{ id: 'old', sender: 'you@example.com', message: 'Hi', timestamp: 100 }],
      receiverHasRead: false
    }]
  };
  dashboard.setState = update => {
    dashboard.state = { ...dashboard.state, ...update };
  };
  return dashboard;
};

describe('Firestore chat dashboard behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    firebase.firestore.FieldValue.arrayUnion.mockImplementation(value => value);
    firebase.auth.mockReturnValue({ currentUser: { email: 'me@example.com' } });
  });

  test('sends trimmed text as a single authenticated conversation append', async () => {
    const update = jest.fn().mockResolvedValue();
    const doc = jest.fn(() => ({ update }));
    firebase.firestore.mockReturnValue({
      collection: jest.fn(() => ({ doc }))
    });
    const dashboard = createDashboard();

    const sent = await dashboard.submitMessage('  Hello  ', {
      id: 'old',
      message: 'Hi',
      sender: 'you@example.com'
    });

    expect(sent).toBe(true);
    expect(doc).toHaveBeenCalledWith('me@example.com:you@example.com');
    const payload = update.mock.calls[0][0];
    expect(payload.receiverHasRead).toBe(false);
    expect(payload.messages.sender).toBe('me@example.com');
    expect(payload.messages.message).toBe('Hello');
    expect(payload.messages.replyTo).toEqual({
      id: 'old',
      message: 'Hi',
      sender: 'you@example.com'
    });
    expect(payload.messages.id).toMatch(/^\d+-[a-z0-9]+$/);
  });

  test('does not send if the authenticated user is not a conversation participant', async () => {
    const update = jest.fn();
    firebase.firestore.mockReturnValue({
      collection: jest.fn(() => ({ doc: jest.fn(() => ({ update })) }))
    });
    const dashboard = createDashboard();
    dashboard.state.chats[0].users = ['someone@example.com', 'you@example.com'];

    const sent = await dashboard.submitMessage('Hello');

    expect(sent).toBe(false);
    expect(update).not.toHaveBeenCalled();
  });

  test('receives live conversation snapshots and unsubscribes on unmount', () => {
    const unsubscribe = jest.fn();
    let receiveSnapshot;
    const onSnapshot = jest.fn(callback => {
      receiveSnapshot = callback;
      return unsubscribe;
    });
    firebase.firestore.mockReturnValue({
      collection: jest.fn(() => ({
        where: jest.fn(() => ({ onSnapshot }))
      }))
    });
    const dashboard = createDashboard();
    dashboard.componentDidMount();

    receiveSnapshot({
      docs: [{
        id: 'me@example.com:you@example.com',
        data: () => ({
          users: ['me@example.com', 'you@example.com'],
          messages: [{ sender: 'you@example.com', message: 'Live', timestamp: 200 }],
          receiverHasRead: false
        })
      }]
    });

    expect(dashboard.state.chatsLoaded).toBe(true);
    expect(dashboard.state.chats[0].messages[0].message).toBe('Live');
    dashboard.componentWillUnmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  test('marks a visible incoming conversation read once', () => {
    const update = jest.fn().mockResolvedValue();
    firebase.firestore.mockReturnValue({
      collection: jest.fn(() => ({ doc: jest.fn(() => ({ update })) }))
    });
    const dashboard = createDashboard();
    const unreadChat = dashboard.state.chats[0];

    dashboard.messageRead(unreadChat);
    dashboard.messageRead(unreadChat);

    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith({ receiverHasRead: true });
  });
});

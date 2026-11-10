import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ChatViewComponent from './chatView';

describe('chat message display', () => {
  test('renders incoming and outgoing messages with day separators, replies and read status', () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10).getTime();
    const yesterday = today - 86400000;
    const markup = ReactDOMServer.renderToStaticMarkup(
      <ChatViewComponent
        user='me@example.com'
        chat={{
          id: 'conversation',
          users: ['me@example.com', 'friend@example.com'],
          receiverHasRead: true,
          messages: [
            { id: 'older', sender: 'friend@example.com', message: 'Yesterday', timestamp: yesterday },
            { id: 'reply', sender: 'me@example.com', message: 'Today', timestamp: today,
              replyTo: { sender: 'friend@example.com', message: 'Yesterday' } }
          ]
        }}
        onBack={jest.fn()}
        onReplyMessage={jest.fn()}
      />
    );

    expect(markup).toContain('Yesterday');
    expect(markup).toContain('Today');
    expect(markup).toContain('message-row-in');
    expect(markup).toContain('message-row-out');
    expect(markup).toContain('message-reply-quote');
    expect(markup).toContain('aria-label="Read"');
    expect(markup).toContain('aria-label="Reply to message"');
  });
});

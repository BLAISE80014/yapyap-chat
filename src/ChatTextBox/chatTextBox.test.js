import ChatTextBoxComponent from './chatTextBox';

describe('chat composer send behavior', () => {
  const createComposer = submitMessageFn => {
    const composer = new ChatTextBoxComponent({ submitMessageFn });
    composer.state = {
      chatText: '  Hello there  ',
      submitting: false,
      error: ''
    };
    composer.setState = update => {
      composer.state = { ...composer.state, ...update };
    };
    return composer;
  };

  test('trims and clears a message only after a successful send', async () => {
    const submitMessageFn = jest.fn().mockResolvedValue(true);
    const composer = createComposer(submitMessageFn);

    await composer.submitMessage({ preventDefault: jest.fn() });

    expect(submitMessageFn).toHaveBeenCalledWith('Hello there', undefined);
    expect(composer.state.chatText).toBe('');
    expect(composer.state.submitting).toBe(false);
  });

  test('keeps the draft when the message send fails', async () => {
    const submitMessageFn = jest.fn().mockResolvedValue(false);
    const composer = createComposer(submitMessageFn);

    await composer.submitMessage({ preventDefault: jest.fn() });

    expect(composer.state.chatText).toBe('  Hello there  ');
    expect(composer.state.error).toMatch(/draft is still here/i);
    expect(composer.state.submitting).toBe(false);
  });
});

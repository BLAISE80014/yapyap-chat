import {
  formatDayLabel,
  formatMessageTime,
  getLastMessageKey,
  getMessageKey,
  messageDayKey
} from './chatUtils';

describe('chat message utilities', () => {
  const now = new Date(2026, 10, 10, 12, 0);

  test('labels messages from today and yesterday', () => {
    expect(formatDayLabel(new Date(2026, 10, 10, 9), now)).toBe('Today');
    expect(formatDayLabel(new Date(2026, 10, 9, 23), now)).toBe('Yesterday');
  });

  test('creates stable local-day keys and readable times', () => {
    const timestamp = new Date(2026, 10, 10, 9, 5);
    expect(messageDayKey(timestamp)).toBe('2026-10-10');
    expect(formatMessageTime(timestamp)).toMatch(/9:05/);
  });

  test('builds keys for both current and legacy messages', () => {
    expect(getMessageKey({ id: 'm1' }, 0)).toBe('m1');
    expect(getMessageKey({ timestamp: 123, sender: 'a@example.com' }, 2))
      .toBe('123-a@example.com-2');
    expect(getLastMessageKey({ messages: [{ timestamp: 123, sender: 'a@example.com' }] }))
      .toBe('123-a@example.com-0');
  });
});

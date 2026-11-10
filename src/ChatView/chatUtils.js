export const messageDate = timestamp => {
  if (timestamp === undefined || timestamp === null) return null;
  if (timestamp instanceof Date) return Number.isNaN(timestamp.getTime()) ? null : timestamp;
  if (typeof timestamp.toDate === 'function') {
    const date = timestamp.toDate();
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof timestamp === 'object' && typeof timestamp.seconds === 'number') {
    const date = new Date(timestamp.seconds * 1000);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const messageDayKey = timestamp => {
  const date = messageDate(timestamp);
  return date
    ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    : 'unknown-date';
};

export const formatDayLabel = (timestamp, now = new Date()) => {
  const date = messageDate(timestamp);
  if (!date) return 'Earlier';

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const daysAgo = Math.round((today.getTime() - messageDay.getTime()) / 86400000);
  if (daysAgo === 0) return 'Today';
  if (daysAgo === 1) return 'Yesterday';
  return date.toLocaleDateString([], { month: 'long', day: 'numeric', year: date.getFullYear() === now.getFullYear() ? undefined : 'numeric' });
};

export const formatMessageTime = timestamp => {
  const date = messageDate(timestamp);
  return date
    ? date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    : '';
};

export const getMessageKey = (message, index) => (
  message.id || `${message.timestamp || 'legacy'}-${message.sender || 'unknown'}-${index}`
);

export const getLastMessageKey = chat => {
  const messages = Array.isArray(chat && chat.messages) ? chat.messages : [];
  return messages.length ? getMessageKey(messages[messages.length - 1], messages.length - 1) : '';
};

export const getLastMessageTime = chat => {
  const messages = Array.isArray(chat && chat.messages) ? chat.messages : [];
  const date = messages.length ? messageDate(messages[messages.length - 1].timestamp) : null;
  return date ? date.getTime() : 0;
};

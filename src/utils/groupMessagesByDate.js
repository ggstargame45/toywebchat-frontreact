// src/utils/groupMessagesByDate.js
export const groupMessagesByDate = (messages) => {
  if (!messages.length) return [];

  const groupedMessages = [];
  let currentDay = new Date(messages[0].sentAt).toLocaleDateString('ko-KR',{ year: "numeric", month: "long", day: "numeric", weekday: "long" });

  groupedMessages.push({ type: 'date', date: currentDay });

  messages.forEach((message) => {
    const messageDay = new Date(message.sentAt).toLocaleDateString('ko-KR',{ year: "numeric", month: "long", day: "numeric", weekday: "long" });
    if (messageDay !== currentDay) {
      groupedMessages.push({ type: 'date', date: messageDay });
      currentDay = messageDay;
    }
    groupedMessages.push({ type: 'message', ...message });
  });

  return groupedMessages;
};

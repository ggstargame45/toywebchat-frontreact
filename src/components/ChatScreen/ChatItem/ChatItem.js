// src/components/ChatScreen/ChatItem/ChatItem.js
import React from 'react';
import './ChatItem.css';

const ChatItem = ({ item, currentUser }) => {
  if (item.type === 'date') {
    return (
      <div className="date-stamp">
        {item.date}
      </div>
    );
  }

  const isCurrentUser = item.username === currentUser;
  return (
    <div className={`chat-item ${isCurrentUser ? 'right' : 'left'}`}>
      {!isCurrentUser && <div className="username">{item.username}</div>}
      <div className="message-bubble">{item.message}</div>
      <div className="timestamp">{new Date(item.sentAt).toLocaleTimeString('ko-KR', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
})}</div>
    </div>
  );
};

export default ChatItem;
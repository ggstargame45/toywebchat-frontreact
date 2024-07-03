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

  if (item.type ==='enter'){
    return (
      <div className="enter-message">
        {item.username}님이 입장하셨습니다.
      </div>
    );
  }

  const isCurrentUser = item.username === currentUser;

  return (
    <div className={`chat-item ${isCurrentUser ? 'right' : 'left'}`}>
      {!isCurrentUser && <div className="username">{item.username}</div>}
      <div className="message-bubble">{item.message}</div>
      <div className="timestamp">{new Date(item.sentAt).toLocaleTimeString('ko-KR',{ hour: "numeric", minute: "numeric" })}</div>
    </div>
  );
};

export default ChatItem;

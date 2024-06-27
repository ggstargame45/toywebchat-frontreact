// src/components/ChatScreen/ChatScreen.js
import React, { useEffect, useRef, useState } from 'react';
import ChatItem from './ChatItem/ChatItem';
import './ChatScreen.css';
import { groupMessagesByDate } from '../../utils/groupMessagesByDate';

const ChatScreen = ({ baseUrl, username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatListRef = useRef(null);

  useEffect(() => {
    const fetchChatInit = async () => {
      try {
        const response = await fetch(`$http://{baseUrl}/chat-init`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch chat init', error);
      }
    };

    fetchChatInit();

    const ws = new WebSocket(`ws://${baseUrl}/ws`);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => ws.close();
  }, [baseUrl]);

  useEffect(() => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const ws = new WebSocket(`ws://${baseUrl}/ws`);
    ws.onopen = () => {
      const message = { username, message: newMessage };
      ws.send(JSON.stringify(message));
      setNewMessage('');
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newMessage.trim() !== '') {
      handleSend();
    }
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="chat-screen">
      <div className="title-bar">Chat</div>
      <div className="chat-list" ref={chatListRef}>
        {groupedMessages.map((item, index) => (
          <ChatItem key={index} item={item} currentUser={username} />
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend} disabled={newMessage.trim() === ''}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;

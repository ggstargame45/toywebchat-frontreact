// src/hooks/useChat.js
import { useState, useEffect } from 'react';
import { fetchChatInit } from '../services/api';
import { createWebSocket } from '../services/websocket';

const useChat = (baseUrl, username) => {
  const [messages, setMessages] = useState([]);
  const [chatError, setChatError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!baseUrl || !username) return;

    const initChat = async () => {
      setLoading(true);
      try {
        const data = await fetchChatInit(baseUrl);
        setMessages(data);
        setChatError(null);
        console.log('Chat initialized with messages:', data);
      } catch (error) {
        console.error('Error in useChat hook:', error);
        setChatError('Failed to initialize chat. Please check the URL.');
      } finally {
        setLoading(false);
      }
    };

    initChat();

    const ws = createWebSocket(baseUrl, (message) => {
      console.log('Received message from WebSocket:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => ws.close();
  }, [baseUrl, username]);

  return { messages, chatError, loading };
};

export default useChat;

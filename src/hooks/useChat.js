// src/hooks/useChat.js
import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchChatInit } from '../services/api';
import { createWebSocket } from '../services/websocket';

const useChat = (baseUrl, username) => {
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);
  const [isWsConnected, setIsWsConnected] = useState(false);

  useEffect(() => {
    if (!baseUrl || !username) return;

    const initChat = async () => {
      try {
        const data = await fetchChatInit(baseUrl);
        setMessages(data);
      } catch (error) {
        console.error('Failed to initialize chat', error);
      }
    };

    initChat();

    wsRef.current = createWebSocket(baseUrl, username, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    }, () => {
      setIsWsConnected(true);
    });

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [baseUrl, username]);

  const sendMessage = useCallback((message) => {
    if (wsRef.current && isWsConnected) {
      wsRef.current.send(JSON.stringify({ username, message }));
    }
  }, [username, isWsConnected]);

  return { messages, sendMessage };
};

export default useChat;

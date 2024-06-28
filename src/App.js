// src/App.js
import React, { useState } from 'react';
import Dialog from './components/Dialog/Dialog';
import ChatScreen from './components/ChatScreen/ChatScreen';
import useChat from './hooks/useChat';
import './App.css';

const App = () => {
  const [baseUrl, setBaseUrl] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { messages, chatError, loading } = useChat(baseUrl, username);

  const handleConfirm = async (url, user) => {
    console.log(`handleConfirm called with URL: https://${url} and Username: ${user}`);
    setBaseUrl(url);
    setUsername(user);
    setError('');

    try {
      const response = await fetch(`https://${url}/chat-init`);
      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Received chat init data:', data);
      } else {
        throw new Error('Received non-JSON response');
      }
    } catch (error) {
      console.error('Error in handleConfirm:', error);
      setError('Input a valid URL');
      setBaseUrl('');
      setUsername('');
    }
  };

  return (
    <div className="app">
      {(loading || chatError || !baseUrl || !username) && (
        <Dialog onConfirm={handleConfirm} error={error || chatError} />
      )}
      {!loading && !chatError && baseUrl && username && (
        <ChatScreen baseUrl={baseUrl} username={username} />
      )}
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default App;

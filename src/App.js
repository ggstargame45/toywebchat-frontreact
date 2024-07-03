// src/App.js
import React, { useState } from 'react';
import DialogBase from './components/Dialog/Dialog';
import ChatScreen from './components/ChatScreen/ChatScreen';
import './App.css';
import { fetchChatInit } from './services/api';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [seenBaseUrl, setSeenBaseUrl] = useState('');
  const [seenUsername, setSeenUsername] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    try {
      setBaseUrl(seenBaseUrl.trim());
      setUsername(seenUsername.trim());
      const response = await fetchChatInit(seenBaseUrl);
      if (response && username) {
        setIsDialogOpen(false);
        setError('');
      }
    } catch (err) {
      setError('Input a valid URL');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && seenBaseUrl && seenUsername) {
      handleConfirm();
    }
  }

  console.log("App.js: ", baseUrl, username);

  return (
    <div className="app">
      <ChatScreen baseUrl={baseUrl} username={username} />
      <DialogBase isOpen={isDialogOpen}>
        <h2>채팅 주소와 사용자 이름을 입력하세요</h2>
        <input
          type="text"
          placeholder="Base URL"
          value={seenBaseUrl}
          onChange={(e) => setSeenBaseUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={seenUsername}
          onChange={(e) => setSeenUsername(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleConfirm} disabled={!seenBaseUrl || !seenUsername}>
          Confirm
        </button>
      </DialogBase>
    </div>
  );
}

export default App;

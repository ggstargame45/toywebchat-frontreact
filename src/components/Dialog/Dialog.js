// src/components/Dialog/Dialog.js
import React, { useState } from 'react';
import './Dialog.css';

const Dialog = ({ onConfirm, error }) => {
  const [baseUrl, setBaseUrl] = useState('');
  const [username, setUsername] = useState('');

  const isConfirmDisabled = !baseUrl || !username;

  const handleConfirm = () => {
    onConfirm(baseUrl, username);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && baseUrl.trim() !== '' && username.trim() !== '') {
      handleConfirm();
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <input
          type="text"
          placeholder="Base URL"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleConfirm} disabled={isConfirmDisabled}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Dialog;

// src/components/Dialog/Dialog.js
import React from 'react';
import ReactDOM from 'react-dom';
import './Dialog.css';

const DialogBase = ({ isOpen, children }) => {
  if (!isOpen) return null;

  console.log("Dialog.js: ", children);

  return ReactDOM.createPortal(
    <div className="dialog-overlay">
      <div className="dialog">
        {children}
      </div>
    </div>,
    document.getElementById('dialog-root')
  );
};

export default DialogBase;
// src/services/websocket.js
export const createWebSocket = (baseUrl, username, onMessage, onOpen) => {
  const ws = new WebSocket(`wss://${baseUrl}/ws`);

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'enter', username: username, message: '' }));
    if (onOpen) onOpen();
  };

  ws.onmessage = (event) => onMessage(JSON.parse(event.data));

  return ws;
};

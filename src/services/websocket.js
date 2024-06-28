// src/services/websocket.js
export const createWebSocket = (baseUrl, onMessage) => {
  const ws = new WebSocket(`wss://${baseUrl}/ws`);
  ws.onmessage = (event) => onMessage(JSON.parse(event.data));
  return ws;
};

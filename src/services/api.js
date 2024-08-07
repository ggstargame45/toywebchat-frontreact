// src/services/api.js
export const fetchChatInit = async (baseUrl) => {
  const response = await fetch(`https://${baseUrl}/chat-init`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

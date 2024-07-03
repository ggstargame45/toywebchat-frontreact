// src/components/ChatScreen/ChatScreen.js
import React, { useEffect, useRef, useState } from "react";
import { FaSync } from "react-icons/fa";
import ChatItem from "./ChatItem/ChatItem";
import "./ChatScreen.css";
import { groupMessagesByDate } from "../../utils/groupMessagesByDate";
import useChat from "../../hooks/useChat";
import { postChatRefresh } from "../../services/api";

const ChatInputComponent = ({ baseUrl, username }) => {
  const { sendMessage } = useChat(baseUrl, username);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    sendMessage(newMessage);
    setNewMessage("");
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage.trim() !== "") {
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <button onClick={handleSend} disabled={newMessage.trim() === ""}>
        Send
      </button>
    </div>
  );
};

const ChatListContainer = ({ baseUrl, username }) => {
  const { messages } = useChat(baseUrl, username);
  const chatListRef = useRef(null);

  useEffect(() => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages]);

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="chat-list" ref={chatListRef}>
      {groupedMessages.map((item, index) => (
        <ChatItem key={index} item={item} currentUser={username} />
      ))}
    </div>
  );
};

const ChatScreen = ({ baseUrl, username }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await postChatRefresh(baseUrl);
    setIsRefreshing(false);
  };

  return (
    <div className="chat-screen">
      <div className="title-bar">
        Chat
        <button
          className={`refresh-button ${isRefreshing ? "rotating" : ""}`}
          onClick={isRefreshing ? null : handleRefresh}
        >
          <FaSync />
        </button>
      </div>
      <ChatListContainer baseUrl={baseUrl} username={username} />
      <ChatInputComponent baseUrl={baseUrl} username={username} />
    </div>
  );
};

export default ChatScreen;

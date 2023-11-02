// import React from "react";
// import axios from "axios";
import React, { useState } from "react";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";

const Chat = (userId) => {
  const [currentChat, setCurrentChat] = useState("");

  const startChat = (otherUserId) => {
    setCurrentChat(otherUserId);
    console.log(currentChat);
  };

  return (
    <div className="chat-app">
      <ChatList userId={userId} onStartChat={startChat} />
      <ChatRoom userId={userId} otherUserId={currentChat} />
    </div>
  );
};

export default Chat;

// components/Chat.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
const ChatRoom = ({ userId, otherUserId }) => {
  const [sendmessages, setMessages] = useState([]);
  const [receivedmessages, setReceiveMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [userNameS, setSUserName] = useState("");
  // const [userNameR, setRUserName] = useState("");
  const [fullnameR, setRFullName] = useState("");

  const fetchMessages = useCallback(async () => {
    try {
      if (userId && otherUserId) {
        const responseSent = await axios.get(
          `http://localhost:3001/messages/${userId.userId}/${otherUserId}`
        );
        const responseReceive = await axios.get(
          `http://localhost:3001/messages/${otherUserId}/${userId.userId}`
        );
        console.log(responseReceive, "Messahdieiyireuio ");
        setMessages(responseSent.data);
        setReceiveMessages(responseReceive.data);
      }
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  }, [userId, otherUserId, setMessages]); // Add dependencies here

  const fetchUserInfo = useCallback(async () => {
    // Fetch user full name from /auth/profile/:userId
    if (otherUserId) {
      // axios
      //   .get(`http://localhost:3001/auth/profile/${userId.userId}`)
      //   .then((response) => {
      //     // setSFullName(response.data.fullname);
      //     setSUserName(response.data.userName);
      //   })
      //   .catch((error) => console.error("Error fetching user profile", error));
      axios
        .get(`http://localhost:3001/auth/profile/${otherUserId}`)
        .then((response) => {
          // setSFullName(response.data.fullname);
          setRFullName(response.data.fullname);
        })
        .catch((error) => console.error("Error fetching user profile", error));
    }
  }, [setRFullName, otherUserId]);

  useEffect(() => {
    fetchMessages();
    fetchUserInfo();
  }, [fetchMessages, fetchUserInfo]);

  const sendMessage = async () => {
    try {
      // Send a new message
      console.log(userId.userId, otherUserId, newMessage);
      await axios.post("http://localhost:3001/messages/send", {
        sender: userId.userId,
        receiver: otherUserId,
        text: newMessage,
      });

      // Clear the input field and fetch updated messages
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="chat">
      <h2>Chating with {fullnameR}</h2>
      <ListGroup>
        {[...sendmessages, ...receivedmessages]
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .map((message) => (
            <ListGroup.Item
              key={message._id}
              className={
                message.sender === userId.userId
                  ? "sent-message"
                  : "received-message"
              }
            >
              {message.text}
            </ListGroup.Item>
          ))}
      </ListGroup>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-warning"
            type="button"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>

    // <div className="chat">
    //   {/* <h2>Chat with User</h2> */}
    //   <h2> Chating with {fullnameR} </h2>
    //   <ListGroup>
    //     {sendmessages.map((message) => (
    //       <ListGroup.Item key={message._id} className="sent-message">
    //         {message.text}
    //       </ListGroup.Item>
    //     ))}
    //     {receivedmessages.map((message) => (
    //       <ListGroup.Item key={message._id} className="received-message">
    //         {message.text}
    //       </ListGroup.Item>
    //     ))}
    //   </ListGroup>
    //   <div className="input-group mb-3">
    //     <input
    //       type="text"
    //       className="form-control"
    //       placeholder="Type a message"
    //       value={newMessage}
    //       onChange={(e) => setNewMessage(e.target.value)}
    //     />
    //     <div className="input-group-append">
    //       <button
    //         className="btn btn-outline-secondary"
    //         type="button"
    //         onClick={sendMessage}
    //       >
    //         Send
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // <div>
    //   <h2>Chat with User</h2>
    //   <div>
    //     {sendmessages.map((message) => (
    //       <div key={message._id}>
    //         Sender: {message.sender}: {message.text}
    //         Receiver: {message.receiver}
    //       </div>
    //     ))}
    //   </div>
    //   Receive
    //   <div>
    //     {receivedmessages.map((message) => (
    //       <div key={message._id}>
    //         Sender: {message.sender}: {message.text}
    //         Receiver: {message.receiver}
    //       </div>
    //     ))}
    //   </div>
    //   <div>
    //     <input
    //       type="text"
    //       value={newMessage}
    //       onChange={(e) => setNewMessage(e.target.value)}
    //     />
    //     <button onClick={sendMessage}>Send</button>
    //   </div>
    // </div>
  );
};

export default ChatRoom;

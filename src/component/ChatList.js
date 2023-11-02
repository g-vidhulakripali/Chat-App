// components/UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { API_URLS } from "../config/config";

const UserList = ({ userId, onStartChat }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URLS.USERS);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return (
    <div className="user-list">
      <h2>Chat!!!</h2>
      <ListGroup>
        {users
          .filter((user) => user._id !== userId.userId)
          .map((user) => (
            <ListGroup.Item
              key={user._id}
              onClick={() => onStartChat(user._id)}
            >
              {user.fullname}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default UserList;

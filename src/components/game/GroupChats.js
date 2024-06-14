import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './GroupChats.css'; // Import the CSS file

function GroupChats() {
  const [chatGroups, setChatGroups] = useState([]);

  useEffect(() => {
    fetchChatGroups();
  }, []);

  const fetchChatGroups = async () => {
    try {
      // Retrieve the username from local storage
      const username = localStorage.getItem('name');

      // Set the username in the request headers
      const config = {
        headers: {
          'username': username
        }
      };

      const response = await axios.get('http://localhost:3000/api/chat-groups', config);

      setChatGroups(response.data);
    } catch (error) {
      console.error('Error fetching chat groups:', error);
    }
  };

  return (
    <div className="group-chats-container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h2 className="group-chats-title">Group Chats</h2>
          <ListGroup className="group-chats-list-group">
            {chatGroups.map((group) => (
              <ListGroup.Item className="group-chats-list-group-item" key={group._id}>
                <Link to={`/chat/${encodeURIComponent(group.name)}`}>{group.name}</Link>
                <Link to={`/chat/${encodeURIComponent(group.name)}`} className="btn">Join Chat</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default GroupChats;

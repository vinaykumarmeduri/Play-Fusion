import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ChatGroup.css';

const ChatGroup = () => {
  const { groupName } = useParams(); // Extract groupName from URL params
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null); // State variable for storing error
  const username = localStorage.getItem('name'); // Retrieve username from local storage

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/chatmessages/${groupName}`);
      setMessages(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError(error.message); // Set error state with error message
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupName]); // Re-fetch messages when groupName changes
  

  const sendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append('groupName', groupName);
      formData.append('sender', username); 
      formData.append('message', newMessage); 
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
  
      const response = await axios.post(`http://localhost:3000/api/chatmessages/${groupName}`, formData);
  
      // Check if the request was successful
      if (response.status === 201) {
        // Clear input fields after sending
        setNewMessage('');
        setSelectedFile(null);
  
        // Fetch messages again to update the chat
        fetchMessages();
      } else {
        console.error('Error sending message:', response.data.error);
        setError(response.data.error); // Set error state with error message
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Internal Server Error'); // Set error state with generic error message
    }
  };
  
  return (
    <div className="chat-group-container">
      <h2 className="chat-group-header">Chat Group: {groupName}</h2>
      {/* Display error message if there's an error */}
      {error && <div className="chat-error-message">{error}</div>}
      <div className="chat-message-container" style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div className="chat-message" key={index}>
            <strong className="chat-message-sender">{message.sender}: </strong>
            <span className="chat-message-body">{message.message}</span>
            {message.fileUrl && (
              <div>
                <a href={message.fileUrl} className="chat-file-link" target="_blank" rel="noopener noreferrer">Download File</a>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="chat-input"
          placeholder="Type your message..."
        />
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={sendMessage} className="chat-send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatGroup;

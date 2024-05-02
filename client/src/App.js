import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';
import NavBar from './navbar';

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSendMessage = () => {
    if (currentMessage.trim() !== '') {
      const newMessage = {
        text: currentMessage,
        author: 'user',
      };
      setMessages([...messages, newMessage]);

      // Send the current message to the Flask server
      fetch(`http://127.0.0.1:5000/answerQuestion/?query=${encodeURIComponent(currentMessage)}`)
        .then(response => response.json())
        .then(data => {
          // Assuming the server response contains the field 'response'
          console.log("Data --> ", data)
          const botResponse = {
            text: data.response,
            author: 'bot',
          };
          // Update the messages state to include the bot's response
          setMessages(prevMessages => [...prevMessages, botResponse]);
        })
        .catch(error => {
          console.error('Error during fetch:', error);
          // Handle the error state appropriately in your UI
        });

      setCurrentMessage('');
    }
  };

  const handleInputChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };



  return (
    <div className="App">
          <nav className="nav-bar">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
      <div>
        <h1>Ask Brain Foundation</h1>
      </div>
      <header className="App-header">
        <div className="chat-container">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.author === 'user' ? 'user' : 'bot'}`}>
                <span>{message.text}</span>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={currentMessage}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

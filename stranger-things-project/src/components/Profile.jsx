import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

export default function Profile({ token }) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user profile when the component mounts
    fetchUserProfile();
  }, []);          

  useEffect(() => {
    // Fetch user's messages when the user state is available
    if (user) {
      fetchUserMessages(user._id);
    }
  }, [user]);

  async function fetchUserProfile() {
    try {
      const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function fetchUserMessages(userId) {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function sendMessage(receiverId) {
    try {
      const response = await axios.post(
        `${BASE_URL}/posts/${receiverId}/messages`,
        {
          content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newMessage = response.data.message;
      setMessages([...messages, newMessage]);
      setMessage('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Profile</h2>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <h3>User Profile</h3>
          <p>Username: {user.username}</p>
          {/* Display other user profile information as needed */}
        </div>
      )}
      <div>
        <h3>Messages</h3>
        <ul>
          {messages.map((msg) => (
            <li key={msg._id}>
              <div>{msg.content}</div>
              {/* Display other message information as needed */}
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Enter a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={() => sendMessage(/* Pass the receiver's user ID here */)}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

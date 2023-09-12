import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config'; 

export default function Register({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        `${BASE_URL}/users/register`,
        {
          username: username,
          password: password,
        }
      );
  
      if (response.status === 201) {
        // Registration was successful
        const result = response.data;
        // Update the token using setToken if the API returns a token
        if (result.token) {
          setToken(result.token);
        }
        // Display a success message
        setSuccessMessage('Registration successful!');
        // Clear any existing error
        setError(null);
      } else {
        // Handle other response statuses if needed
        setError('Registration failed');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

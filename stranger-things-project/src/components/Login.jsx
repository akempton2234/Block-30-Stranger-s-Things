import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config'; 

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/users/login`,
        {
          username: username,
          password: password,
        }
      );

      if (response.status === 200) {
        // Login was successful
        const result = response.data;
        // Update the token using setToken
        setToken(result.token);
        // Clear any existing error
        setError(null);
      } else {
        // Handle other response statuses if needed
        setError('Login failed');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Login</h2>
      {error && <p>{error}</p>}
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

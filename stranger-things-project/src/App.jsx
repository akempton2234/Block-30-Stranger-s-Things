import { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Posts from './components/Posts';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div id="container">
      <div id="navbar">
        <Link to="/posts">posts</Link>
        <Link to="/profile">profile</Link>
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
      </div>
      <div id="main-section">
        <Routes>
          <Route path="/" element={<Register setToken={setToken} />} />
          <Route path="/posts" element={<Posts token={token} />} />
          <Route path="/profile" element={<Profile token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

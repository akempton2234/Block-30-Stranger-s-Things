import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config'; // Adjust the import path

export default function Post({ token }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get(`${BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.posts);
    } catch (error) {
      setError(error.message);
    }
  }

  async function createNewPost() {
    try {
      const response = await axios.post(
        `${BASE_URL}/posts`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newPost = response.data.post;
      // Add the new post to the existing posts array
      setPosts([...posts, newPost]);
      // Clear the form fields
      setTitle('');
      setContent('');
      // Clear any existing error
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }

  async function updateExistingPost(postId, newTitle, newContent) {
    try {
      const response = await axios.patch(
        `${BASE_URL}/posts/${postId}`,
        {
          title: newTitle,
          content: newContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPost = response.data.post;
      // Update the posts array with the updated post
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, ...updatedPost } : post
        )
      );
      // Clear any existing error
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }

  async function deleteExistingPost(postId) {
    try {
      const response = await axios.delete(`${BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        // Post was successfully deleted
        // Remove the deleted post from the posts array
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
        // Clear any existing error
        setError(null);
      } else {
        setError('Failed to delete the post');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Posts</h2>
      {error && <p>{error}</p>}
      <div>
        <h3>Create New Post</h3>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button onClick={createNewPost}>Create Post</button>
      </div>
      <div>
        <h3>Posts List</h3>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <div>
                <strong>{post.title}</strong>
              </div>
              <div>{post.content}</div>
              <div>
                <button
                  onClick={() => updateExistingPost(post._id, 'New Title', 'New Content')}
                >
                  Update Post
                </button>
                <button onClick={() => deleteExistingPost(post._id)}>Delete Post</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

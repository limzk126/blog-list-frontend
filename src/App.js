import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const credentials = {
      username,
      password,
    };
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      window.localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
      setMessage({
        text: error.response.data.error,
        isWarning: true,
      });
      setTimeout(() => {
        setMessage({});
      }, 4000);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <Notification message={message.text} isWarning={message.isWarning} />
          <div>
            Username{' '}
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password{' '}
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const onLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const addBlog = async (newBlog) => {
    const blog = await blogService.create(newBlog);
    setBlogs(blogs.concat(blog));
  };

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.username} logged in <button onClick={onLogout}>logout</button>
        </div>
        <Togglable buttonLabel="new note">
          <BlogForm user={user} createBlog={addBlog} />
        </Togglable>
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  };
  return <div>{user === null ? loginForm() : blogList()}</div>;
};

export default App;

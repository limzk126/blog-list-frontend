import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (user !== null) {
      const initializeBlogs = async () => {
        const allBlogs = await blogService.getAll();
        allBlogs.sort((a, b) => {
          if (a.likes > b.likes) return -1;
          if (a.likes < b.likes) return 1;
          return 0;
        });
        setBlogs(allBlogs);
      };
      initializeBlogs();
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
      <LoginForm
        handleSubmit={handleLogin}
        handlePasswordChange={setPassword}
        handleUsernameChange={setUsername}
        password={password}
        username={username}
        message={message}
      />
    );
  };

  const onLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const blogFormRef = useRef();
  const addBlog = async (newBlog) => {
    const blog = await blogService.create(newBlog);
    setBlogs(blogs.concat(blog));
    blogFormRef.current.toggleVisibility();
    setMessage({
      text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      isWarning: false,
    });
    setTimeout(() => {
      setMessage({});
    }, 4000);
  };

  const updateLikes = async (id, likes) => {
    await blogService.update(id, { likes });
  };

  const deleteBlog = async (toDelete) => {
    if (window.confirm(`Remove blog ${toDelete.title} by ${toDelete.author}`)) {
      await blogService.remove(toDelete.id);
      setBlogs(blogs.filter((blog) => blog.id !== toDelete.id));
    }
  };

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.username} logged in <button onClick={onLogout}>logout</button>
        </div>
        <Notification message={message.text} isWarning={message.isWarning} />
        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <BlogForm user={user} createBlog={addBlog} />
        </Togglable>
        <div id="blog-list">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              removeBlog={deleteBlog}
            />
          ))}
        </div>
      </div>
    );
  };
  return <div>{user === null ? loginForm() : blogList()}</div>;
};

export default App;

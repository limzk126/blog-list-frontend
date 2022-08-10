import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';

const BlogForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState({});

  const createHandler = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
      user: user.id,
    };
    await blogService.create(newBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
    setMessage({
      text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      isWarning: false,
    });
    setTimeout(() => {
      setMessage({});
    }, 4000);
  };

  return (
    <form onSubmit={createHandler}>
      <Notification message={message.text} isWarning={message.isWarning} />
      <div>
        title:{' '}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

const exports = BlogForm;

export default exports;

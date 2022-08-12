import { useState } from 'react';
import Notification from './Notification';

const BlogForm = ({ user, createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createHandler = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
      user: user.id,
    };
    createBlog(newBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={createHandler}>
      <h2>create new</h2>
      <div>
        title:{' '}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          id="blogTitle"
        />
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          id="blogAuthor"
        />
      </div>
      <div>
        url:{' '}
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          id="blogUrl"
        />
      </div>
      <button type="submit" id="create-button">
        create
      </button>
    </form>
  );
};

const exports = BlogForm;

export default exports;

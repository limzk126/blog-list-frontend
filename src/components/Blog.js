import { useState } from 'react';

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const [isView, setIsView] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    backgroundColor: '#00FFFF',
  };

  const hideWhenView = { display: isView ? 'none' : '' };
  const showWhenView = { display: isView ? '' : 'none' };

  const toggleView = () => {
    setIsView(!isView);
  };

  const incrementLike = () => {
    updateLikes(blog.id, likes + 1);
    setLikes(likes + 1);
  };

  const removeHandler = () => {
    removeBlog(blog);
  };

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenView} className="beforeView">
        {blog.title} {blog.author} <button onClick={toggleView}>view</button>
      </div>
      <div style={showWhenView} className="afterView">
        <div>
          {blog.title} <button onClick={toggleView}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {likes}{' '}
          <button onClick={incrementLike} id="like-button">
            like
          </button>
        </div>
        <div>{blog.author}</div>
      </div>
      <div>
        <button style={removeButtonStyle} onClick={removeHandler}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;

import { useState } from 'react';

const Blog = ({ blog }) => {
  const [isView, setIsView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenView = { display: isView ? 'none' : '' };
  const showWhenView = { display: isView ? '' : 'none' };

  const toggleView = () => {
    setIsView(!isView);
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenView}>
        {blog.title} {blog.author} <button onClick={toggleView}>view</button>
      </div>
      <div style={showWhenView}>
        <div>
          {blog.title} <button onClick={toggleView}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>
  );
};

export default Blog;

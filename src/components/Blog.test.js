import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;

  const dummyBlog = {
    title: 'Hagusa',
    author: 'Hiroyuki',
    likes: 0,
    url: 'www.t.com',
    user: '1123123seas',
  };

  const updateLikes = jest.fn();
  const removeBlogs = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog
        blog={dummyBlog}
        updateLikes={updateLikes}
        removeBlog={removeBlogs}
      />
    ).container;
  });

  test('at start only title and author displayed', () => {
    const beforeView = container.querySelector('.beforeView');
    const afterView = container.querySelector('.afterView');

    expect(beforeView).not.toHaveStyle('display: none');
    expect(afterView).toHaveStyle('display: none');
  });
});

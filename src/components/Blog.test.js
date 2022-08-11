import React, { createElement } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import BlogForm from './BlogForm';

describe('<Blog />', () => {
  let container;

  const dummyBlog = {
    title: 'Hagusa',
    author: 'Hiroyuki',
    likes: 0,
    url: 'www.t.com',
    user: '1123123seas',
  };

  let updateLikes;
  let removeBlogs;

  beforeEach(() => {
    updateLikes = jest.fn();
    removeBlogs = jest.fn();
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

  test('url and likes are additionally displayed after clicking view button', async () => {
    const button = screen.getByText('view');
    const user = userEvent.setup();
    await user.click(button);
    const beforeView = container.querySelector('.beforeView');
    const afterView = container.querySelector('.afterView');

    expect(beforeView).toHaveStyle('display: none');
    expect(afterView).not.toHaveStyle('display: none');
  });

  test('if like button clicked twice, event handler is called twice', async () => {
    const button = screen.getByText('like');
    const user = userEvent.setup();
    await user.click(button);
    await user.click(button);

    expect(updateLikes.mock.calls).toHaveLength(2);
  });
});

describe('<BlogForm />', () => {
  let container;

  const dummyUser = {
    username: 'john',
    name: 'jj',
    id: '123',
  };

  let createBlog;

  beforeEach(() => {
    createBlog = jest.fn();
    container = render(
      <BlogForm user={dummyUser} createBlog={createBlog} />
    ).container;
  });

  test('<BlogForm /> calls onSubmit and creates blog correctly', async () => {
    const titleInput = container.querySelector('#blogTitle');
    const authorInput = container.querySelector('#blogAuthor');
    const urlInput = container.querySelector('#blogUrl');
    const createButton = screen.getByText('create');

    const user = userEvent.setup();
    await user.type(titleInput, 'mike wazowski');
    await user.type(authorInput, 'john cena');
    await user.type(urlInput, 'www.test.com');
    await user.click(createButton);
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('mike wazowski');
    expect(createBlog.mock.calls[0][0].author).toBe('john cena');
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.com');
    expect(createBlog.mock.calls[0][0].user).toBe('123');
  });
});

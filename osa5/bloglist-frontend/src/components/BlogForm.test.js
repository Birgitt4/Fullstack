import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('createBlog is called with right fields', () => {
    const createBlog = jest.fn()

    const container = render(<BlogForm createBlog={createBlog} />).container

    const title = container.querySelector('#t')
    const author = container.querySelector('#a')
    const url = container.querySelector('#u')

    const button = screen.getByText('create')

    userEvent.type(title, 'this is title')
    userEvent.type(author, 'author')
    userEvent.type(url, 'www.fi.com')
    userEvent.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('this is title')
    expect(createBlog.mock.calls[0][0].author).toBe('author')
    expect(createBlog.mock.calls[0][0].url).toBe('www.fi.com')
})

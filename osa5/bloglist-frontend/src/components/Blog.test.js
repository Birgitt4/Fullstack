import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
    const blog = {
        title: 'How to test your frontend',
        author: 'mluukkai',
        url: 'fullstack-hy.github.io',
        likes: 13477,
        user: {
            name: 'OP',
            username: 'op123'
        }
    }

    render(<Blog blog={blog} />)
    screen.getByText('How to test your', { exact: false })
    screen.findByText('mluukkai')
})

test('does not render url or likes', () => {
    const blog = {
        title: 'How to test your frontend',
        author: 'mluukkai',
        url: 'fullstack-hy.github.io',
        likes: 13477,
        user: {
            name: 'OP',
            username: 'op123'
        }
    }

    const container = render(<Blog blog={blog} />).container

    const div = container.querySelector('.blogInfo')
    expect(div).toHaveStyle('display: none')
})

test('clicking \'view\' shows url and likes', () => {
    const blog = {
        title: 'How to test your frontend',
        author: 'mluukkai',
        url: 'fullstack-hy.github.io',
        likes: 13477,
        user: {
            name: 'OP',
            username: 'op123'
        }
    }

    let container = render(<Blog blog={blog} />).container

    const button = screen.getByText('view')
    userEvent.click(button)

    const div = container.querySelector('.blogInfo')
    expect(div).not.toHaveStyle('display: none')

    screen.findByText(blog.url)
    screen.findByText('likes 13477')
})

test('clicking \'like\' twice calls event handler twice', () => {
    const blog = {
        title: 'How to test your frontend',
        author: 'mluukkai',
        url: 'fullstack-hy.github.io',
        likes: 13477,
        user: {
            name: 'OP',
            username: 'op123'
        }
    }
    let mockHandler = jest.fn()

    render(
        <Blog blog={blog} likeBlog={mockHandler} />
    )

    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(mockHandler).toHaveBeenCalledTimes(2)
})
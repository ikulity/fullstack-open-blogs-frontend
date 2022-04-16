import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    title: 'test title',
    url: 'www.test.com',
    likes: 0,
    author: 'tester dude',
    user: {
        username: 'trollAccount',
        name: 'myname'
    }
}

test('renders default content', () => {
    const { container } = render(<Blog blog={blog} />)

    const detailsButton = container.querySelector('#detailsButton')
    expect(detailsButton).toHaveTextContent('view')

    const likeButton = container.querySelector('#likeButton')
    expect(likeButton).toBeNull()

    const urlElement = container.querySelector('#url')
    expect(urlElement).toBeNull()

    const likesElement = container.querySelector('#likes')
    expect(likesElement).toBeNull()
})

test('renders detailed content when pressing view button', () => {
    const { container } = render(<Blog blog={blog} />)

    const button = screen.getByText('view')
    userEvent.click(button)

    const detailsButton = container.querySelector('#detailsButton')
    expect(detailsButton).toHaveTextContent('hide')

    const likeButton = container.querySelector('#likeButton')
    expect(likeButton).toHaveTextContent('like')

    const urlElement = container.querySelector('#url')
    expect(urlElement).toHaveTextContent(blog.url)

    const likesElement = container.querySelector('#likes')
    expect(likesElement).toHaveTextContent(`likes ${blog.likes}`)
})
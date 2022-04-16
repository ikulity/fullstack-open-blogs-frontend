import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'test title',
        url: 'www.test.com',
        likes: 0,
        author: 'tester dude'
    }

    const { container } = render(<Blog blog={blog} />)
    screen.debug()
    const detailsButton = container.querySelector('#detailsButton')
    expect(detailsButton).toHaveTextContent('view')

    const likeButton = container.querySelector('#likeButton')
    expect(likeButton).toBeNull()

    const urlElement = container.querySelector('#url')
    expect(urlElement).toBeNull()

    const likesElement = container.querySelector('#likes')
    expect(likesElement).toBeNull()
})
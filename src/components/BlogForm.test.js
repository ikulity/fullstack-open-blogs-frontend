import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

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

describe('<BlogForm/>', () => {
    test('calls event handler for new blog with correct new blog object', () => {
        const mockFunction = jest.fn()
        render(<BlogForm handleNewBlog={mockFunction} />)

        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')

        userEvent.type(titleInput, blog.title)
        userEvent.type(authorInput, blog.author)
        userEvent.type(urlInput, blog.url)

        const submitButton = screen.getByText('create')
        userEvent.click(submitButton)

        expect(mockFunction.mock.calls).toHaveLength(1)
        expect(expect.objectContaining(mockFunction.mock.calls[0][0])).toEqual(blog)
    })
})


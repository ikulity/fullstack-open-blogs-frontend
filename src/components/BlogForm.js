import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        handleNewBlog({
            title,
            author,
            url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <div>
            <h3>create new</h3>

            <form onSubmit={addBlog}>
                <div>
                    title:<input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='title'
                    />
                </div>
                <div>
                    author:<input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder='author'
                    />
                </div>
                <div>
                    url:<input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='url'
                    />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    handleNewBlog: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default BlogForm
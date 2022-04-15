import PropTypes from 'prop-types'

const BlogForm = ({ handleNewBlog, title, setTitle, author, setAuthor, url, setUrl }) => {
    return (
        <div>
            <h3>create new</h3>

            <form onSubmit={handleNewBlog}>
                <div>
                    title:<input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    author:<input value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    url:<input value={url} onChange={(e) => setUrl(e.target.value)} />
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
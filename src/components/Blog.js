import { useState } from 'react'

const Blog = ({ blog, handleRemove, handleLike, username }) => {
    const [blogObject, setBlogObject] = useState(blog)
    const [showDetails, setShowDetails] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const onClickLike = () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
        }
        try {
            handleLike(updatedBlog)
            setBlogObject(updatedBlog)
            setIsLiked(true)
        } catch (err) {
            console.log(err)
        }
    }

    if (showDetails) return (
        <div style={blogStyle}>
            {blog.title} - {blog.author} <button onClick={() => setShowDetails(false)} id='detailsButton'>hide</button>
            <p id='url'>{blog.url}</p>
            <p id='likes'>likes {blogObject.likes} {!isLiked ? <button onClick={() => onClickLike()} id='likeButton'>like</button> : <></>} </p>
            <p>{blog.user.name}</p>
            {username === blog.user.username ? <button onClick={() => handleRemove(blog.id)}>remove</button> : <></>}
        </div>

    )
    return (
        <div style={blogStyle}>
            {blog.title} - {blog.author} <button onClick={() => setShowDetails(true)} id='detailsButton'>view</button>
        </div>
    )
}

export default Blog
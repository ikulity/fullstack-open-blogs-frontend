import { useState } from 'react'
import { updateBlog } from '../services/blogs'

const Blog = ({ blog, handleRemove, username }) => {
    const [showDetails, setShowDetails] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLike = async () => {
        try {
            let response = await updateBlog({ ...blog, likes: blog.likes + 1 })
            console.log(response.data.likes)
            blog.likes = response.data.likes
            setIsLiked(true)
        } catch (err) {
            console.log(err)
        }
    }

    if (showDetails) return (
        <div style={blogStyle}>
            {blog.title} - {blog.author} <button onClick={() => setShowDetails(false)} id='detailsButton'>hide</button>
            <p id='url'>{blog.url}</p>
            <p id='likes'>likes {blog.likes} {!isLiked ? <button onClick={() => handleLike()} id='likeButton'>like</button> : <></>} </p>
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
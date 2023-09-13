import { useState } from 'react'

const Blog = ({ blog, handleRemove, handleLike, username }) => {
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
            setIsLiked(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="blog" style={blogStyle}>
            {blog.title} - {blog.author} <button onClick={() => setShowDetails(!showDetails)} id='detailsButton'>{showDetails ? 'hide' : 'view'}</button>
            {showDetails && (
                <div>
                    <p id='url'>{blog.url}</p>
                    <p id='likes'>likes {blog.likes} {!isLiked ? <button onClick={() => onClickLike()} id='likeButton'>like</button> : <></>} </p>
                    <p>{blog.user.name}</p>

                    {username === blog.user.username ? <button onClick={() => handleRemove(blog.id)}>remove</button> : <></>}
                </div>
            )}
        </div>
    )
}

export default Blog
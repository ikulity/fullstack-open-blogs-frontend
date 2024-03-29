import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { getAllBlogs, createBlog, updateBlog, removeBlog } from './services/blogs'
import { login } from './services/login'

const App = () => {
    // login form
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [blogs, setBlogs] = useState([])

    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)

    const blogFormRef = useRef()

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setName(localStorage.getItem('blogUsername'))
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        let blogs = await getAllBlogs()
        setBlogs(blogs.data)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            let response = await login({ username, password })
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('blogUsername', response.data.username)
            setToken(response.data.token)
            setName(response.data.username)
            setUsername('')
            setPassword('')
            fetchBlogs()
        } catch (err) {
            showMessage('wrong username or password', true)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('blogUsername')
        setToken('')
        setName('')
    }

    const handleNewBlog = async (blog) => {
        try {
            let response = await createBlog(blog)
            blogFormRef.current.toggleVisibility()
            showMessage(`a new blog: ${response.data.title} added!`)
            fetchBlogs()

        } catch (err) {
            showMessage(err.message, true)
        }
    }

    const handleLike = async (blog) => {
        try {
            await updateBlog(blog)
            fetchBlogs()
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemove = async (id) => {
        try {
            const blog = blogs.find((obj) => obj.id === id)
            if (window.confirm(`Remove blog: "${blog.title}" by ${blog.author} ?`)) {
                await removeBlog(id)
                let filteredBlogs = blogs.filter((blog) => blog.id !== id)
                setBlogs(filteredBlogs)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const showMessage = (message, isError = false) => {
        setIsError(isError)
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const compareLikes = (a, b) => {
        if (a.likes < b.likes) return 1
        if (a.likes > b.likes) return -1
        if (a.likes === b.likes) return 0
    }

    if (token) return (
        <div>
            <h1>blogs</h1>
            <h3>
                {name} logged in
                <button onClick={handleLogout}>logout</button>
            </h3>

            <Notification message={message} isError={isError} />
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm handleNewBlog={handleNewBlog} />
            </Togglable>

            <p></p>

            <div className="blogs">
                {
                    blogs
                        .sort(compareLikes)
                        .map(blog =>
                            <Blog key={blog.id} blog={blog} handleRemove={handleRemove} handleLike={handleLike} username={name} />
                        )
                }
            </div>

        </div>
    )
    return (
        <div>
            <h1>Log in to application</h1>

            <Notification message={message} isError={isError} />

            <form onSubmit={handleLogin}>
                <div>
                    username <input id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    password <input id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button id='login-button' type="submit">login</button>
                </div>
            </form>

        </div>
    )
}

const Notification = ({ message, isError }) => {
    if (message === null) return null
    return (
        <div className={`${isError ? 'error' : 'message'} notification`} >
            {message}
        </div>
    )
}

export default App

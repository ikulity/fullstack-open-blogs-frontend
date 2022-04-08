import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAllBlogs, createBlog } from './services/blogs'
import { login } from './services/login'

const App = () => {
    // login form
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // new blog form
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setToken(localStorage.getItem('token'))
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
            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
            setName(response.data.username)
            setUsername('')
            setPassword('')
        } catch (err) {
            showMessage('wrong username or password', true)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken('')
        setName('')
    }

    const handleNewBlog = async (event) => {
        event.preventDefault()
        try {
            let response = await createBlog({ title, author, url }, token)
            showMessage(`a new blog: ${response.data.title} added!`)
            fetchBlogs()
        } catch (err) {
            showMessage(err.message, true)
        }
    }

    const showMessage = (message, isError = false) => {
        setIsError(isError)
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    if (token) return (
        <div>
            <h1>blogs</h1>
            <h3>
                {name} logged in
                <button onClick={handleLogout}>logout</button>
            </h3>

            <Notification message={message} isError={isError} />

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
            <p></p>
            {
                blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </div>
    )
    return (
        <div>
            <h1>Log in to application</h1>

            <Notification message={message} isError={isError} />

            <form onSubmit={handleLogin}>
                <div>
                    username <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    password <input value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>

        </div>
    )
}

const Notification = ({ message, isError }) => {
    if (message === null) return null
    return (
        <div className={`${isError ? "error" : "message"} notification`} >
            {message}
        </div>
    )
}

export default App

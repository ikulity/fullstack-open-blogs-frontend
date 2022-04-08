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

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        let blogs = await getAllBlogs()
        console.log(blogs.data)
        setBlogs(blogs.data)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await login({ username, password })
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
            setName(response.data.username)
            setUsername('')
            setPassword('')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken('')
        setName('')
    }

    const handleNewBlog = () => {
        createBlog({ title, author, url }, token)
        fetchBlogs()
    }

    if (token) return (
        <div>
            <h1>blogs</h1>
            <h3>
                {name} logged in
                <button onClick={handleLogout}>logout</button>
            </h3>

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
            <form onSubmit={handleSubmit}>
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
export default App

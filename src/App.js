import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    // login form
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await loginService.login({ username, password })
        if (response.status === 200) {
            setToken(response.data.token)
            setName(response.data.username)
            setUsername('')
            setPassword('')
        }
    }

    const handleLogout = () => {
        setToken('')
        setName('')
    }

    const usernameChange = (event) => {
        setUsername(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div>
            {token ? <Blogs blogs={blogs} handleLogout={handleLogout} name={name} /> : <LoginForm
                handleSubmit={handleSubmit}
                username={username}
                usernameChange={usernameChange}
                password={password}
                passwordChange={passwordChange} />
            }
        </div >
    )

}

const Blogs = ({ blogs, handleLogout, name }) => {
    return (
        <div>
            <h1>blogs</h1>
            <h3>
                {name} logged in
                <button onClick={handleLogout}>logout</button>
            </h3>

            {
                blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </div>
    )
}

const LoginForm = ({ handleSubmit, username, usernameChange, password, passwordChange }) => {
    return (
        <div>
            <h1>Log in to application</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    username <input value={username} onChange={usernameChange} />
                </div>
                <div>
                    password <input value={password} onChange={passwordChange} />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>

        </div>
    )
}

export default App

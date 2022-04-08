import axios from 'axios'
const baseUrl = '/api/blogs'



export const getAllBlogs = () => {
    return axios.get(baseUrl)
}

export const createBlog = async (newBlog, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.post(baseUrl, newBlog, config)
}

import axios from 'axios'

const baseUrl = '/api/blogs'

export const getAllBlogs = () => {
    return axios.get(baseUrl)
}

export const createBlog = async (newBlog) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    return await axios.post(baseUrl, newBlog, config)
}

export const updateBlog = async (updatedBlog) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    return await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
}

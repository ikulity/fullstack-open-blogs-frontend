import axios from 'axios'

const baseUrl = '/api/blogs'

const getConfig = () => {
    console.log("token: ", localStorage.getItem('token'))
    return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
}

export const getAllBlogs = () => {
    return axios.get(baseUrl)
}

export const createBlog = async (newBlog) => {
    return await axios.post(baseUrl, newBlog, getConfig())
}

export const updateBlog = async (updatedBlog) => {
    return await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, getConfig())
}

export const removeBlog = async (blogId) => {
    return await axios.delete(`${baseUrl}/${blogId}`, getConfig())
}

import axios from 'axios'
const baseUrl = '/api/login'

export const login = async (credentials) => {
    return await axios.post(baseUrl, credentials)
}

import axios from 'axios'
const baseUrl = '/api/login'

export const login = (credentials) => {
    return axios.post(baseUrl, credentials)
}

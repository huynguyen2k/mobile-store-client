import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
	baseURL: 'http://localhost:8000',
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axiosClient.interceptors.response.use(
	response => {
		return response.data
	},
	error => {
		return Promise.reject(error?.response?.data)
	}
)

export default axiosClient

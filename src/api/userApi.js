import axiosClient from './axiosClient'

const userApi = {
	login(data) {
		const url = '/api/users/login'
		return axiosClient.post(url, data)
	},
	register() {},
}

export default userApi

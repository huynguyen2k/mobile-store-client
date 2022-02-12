import axiosClient from './axiosClient'

const userApi = {
	login(data) {
		const url = '/api/users/login'
		return axiosClient.post(url, data)
	},
	register(data) {
		const url = '/api/users/register'
		return axiosClient.post(url, data)
	},
	getAllRole() {
		const url = '/api/users/get-all-role'
		return axiosClient.get(url)
	},
	getAllStaff() {
		const url = '/api/users/get-all-staff'
		return axiosClient.get(url)
	},
	getAllCustomer() {
		const url = '/api/users/get-all-customer'
		return axiosClient.get(url)
	},
}

export default userApi

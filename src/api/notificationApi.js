import axiosClient from './axiosClient'

const notificationApi = {
	getAll(published) {
		let url = '/api/notification'
		if (published !== undefined) {
			url = `/api/notification?published=${published}`
		}
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/notification'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/notification/${data.id}`
		return axiosClient.put(url, data)
	},
	delete(id) {
		const url = `/api/notification/${id}`
		return axiosClient.delete(url)
	},
}

export default notificationApi

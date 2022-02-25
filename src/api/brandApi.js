import axiosClient from './axiosClient'

const brandApi = {
	getAll(published) {
		let url = '/api/brands'
		if (published !== undefined) {
			url = `/api/brands?published=${published}`
		}
		return axiosClient.get(url)
	},
	get(id) {
		const url = `/api/brands/${id}`
		return axiosClient.get(url)
	},
	add(data) {
		const url = '/api/brands'
		return axiosClient.post(url, data)
	},
	update(data) {
		const url = `/api/brands/${data.id}`
		return axiosClient.put(url, data)
	},
	delete(id) {
		const url = `/api/brands/${id}`
		return axiosClient.delete(url)
	},
}

export default brandApi

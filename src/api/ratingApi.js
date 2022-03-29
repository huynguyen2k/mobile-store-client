import axiosClient from './axiosClient'

const ratingApi = {
	getAll(userId) {
		const url = '/api/rating'
		return axiosClient.get(url, { params: { userId } })
	},
	add(data) {
		const url = '/api/rating'
		return axiosClient.post(url, data)
	},
	uploadImage(data) {
		const url = '/api/rating/upload-image'
		return axiosClient.post(url, data)
	},
	deleteImage(data) {
		const url = '/api/rating/delete-image'
		return axiosClient.post(url, data)
	},
}

export default ratingApi

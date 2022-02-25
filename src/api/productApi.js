import axiosClient from './axiosClient'

const productApi = {
	add(data) {
		const url = '/api/product'
		return axiosClient.post(url, data)
	},
	uploadImage(data) {
		const url = '/api/product/upload-image'
		return axiosClient.post(url, data)
	},
	deleteImage(data) {
		const url = '/api/product/delete-image'
		return axiosClient.post(url, data)
	},
}

export default productApi

import axiosClient from './axiosClient'

const productApi = {
	get(id) {
		const url = `/api/product/${id}`
		return axiosClient.get(url)
	},
	getAll(data) {
		const url = '/api/product'
		return axiosClient.get(url)
	},
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
	addProductOption(data) {
		const url = '/api/product/product-option'
		return axiosClient.post(url, data)
	},
	updateProductOption(data) {
		const { id, ...restData } = data
		const url = `/api/product/product-option/${id}`
		return axiosClient.put(url, restData)
	},
	deleteProductOption(id) {
		const url = `/api/product/product-option/${id}`
		return axiosClient.delete(url)
	},
}

export default productApi

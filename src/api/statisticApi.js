import axiosClient from './axiosClient'

const statisticApi = {
	getAll() {
		const url = '/api/statistic'
		return axiosClient.get(url)
	},
	getTotalPrice(params) {
		const url = '/api/statistic/get-total-price'
		return axiosClient.get(url, { params })
	},
}

export default statisticApi

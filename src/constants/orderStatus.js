const orderStatus = {
	order: {
		id: 1,
		name: 'Đặt hàng',
	},
	waiting: {
		id: 2,
		name: 'Chờ xác nhận',
	},
	processing: {
		id: 3,
		name: 'Đang xử lý',
	},
	delivering: {
		id: 4,
		name: 'Đang vận chuyển',
	},
	delivered: {
		id: 5,
		name: 'Đã giao hàng',
	},
	completed: {
		id: 6,
		name: 'Hoàn tất',
	},
	cancelled: {
		id: 7,
		name: 'Đã hủy',
	},
}

export default orderStatus

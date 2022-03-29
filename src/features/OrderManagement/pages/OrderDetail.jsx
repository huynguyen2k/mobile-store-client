import { Modal, notification } from 'antd'
import orderApi from 'api/orderApi'
import ratingApi from 'api/ratingApi'
import useFetchData from 'hooks/useFetchData'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import OrderDetail from '../components/OrderDetail'
import RatingForm from '../components/RatingForm'

function OrderDetailPage() {
	const params = useParams()
	const orderId = Number(params.orderId)

	const [ratingData, setRatingData] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const [order, setOrder] = useState(null)
	const [fetchOrderId, setFetchOrderId] = useState(Date.now())

	const user = useSelector(state => state.auth.user)
	const { data: orderStatusList } = useFetchData(orderApi.getAllOrderStatus)
	const { data: ratingList, refetchData: fetchRatingList } = useFetchData(() =>
		ratingApi.getAll(user.id)
	)

	useEffect(() => {
		let mounted = true

		;(async () => {
			try {
				const response = await orderApi.get(orderId)
				mounted && setOrder(response.content)
			} catch (error) {
				console.log(error)
			}
		})()

		return () => {
			mounted = false
		}
	}, [orderId, fetchOrderId])

	const handleConfirm = async data => {
		try {
			const response = await orderApi.update(data)
			notification.success({
				message: response.message,
			})
			setFetchOrderId(Date.now())
		} catch (error) {
			console.log(error)
		}
	}

	const handleRating = data => {
		setRatingData(data)
		setIsModalVisible(true)
	}

	const handleRatingSubmit = async data => {
		try {
			await sleep(1000)
			const response = await ratingApi.add({ ...data, user_id: user.id })

			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})

			fetchRatingList()
			setRatingData(null)
			setIsModalVisible(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<Modal
				centered
				destroyOnClose
				width={650}
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<RatingForm data={ratingData} onSubmit={handleRatingSubmit} />
			</Modal>

			<OrderDetail
				data={order}
				user={user}
				ratingList={ratingList}
				orderStatusList={orderStatusList}
				onConfirm={handleConfirm}
				onCancel={handleConfirm}
				onRating={handleRating}
			/>
		</div>
	)
}

export default OrderDetailPage

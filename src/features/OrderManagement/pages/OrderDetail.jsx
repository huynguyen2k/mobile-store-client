import { notification } from 'antd'
import orderApi from 'api/orderApi'
import useFetchData from 'hooks/useFetchData'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import OrderDetail from '../components/OrderDetail'

function OrderDetailPage() {
	const params = useParams()
	const orderId = Number(params.orderId)
	const [order, setOrder] = useState(null)
	const [fetchOrderId, setFetchOrderId] = useState(Date.now())

	const user = useSelector(state => state.auth.user)
	const { data: orderStatusList } = useFetchData(orderApi.getAllOrderStatus)

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

	return (
		<div>
			<OrderDetail
				data={order}
				user={user}
				orderStatusList={orderStatusList}
				onConfirm={handleConfirm}
				onCancel={handleConfirm}
			/>
		</div>
	)
}

export default OrderDetailPage

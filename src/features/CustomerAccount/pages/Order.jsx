import orderApi from 'api/orderApi'
import useFetchData from 'hooks/useFetchData'
import React from 'react'
import { useSelector } from 'react-redux'
import OrderList from '../components/OrderList'

function OrderPage() {
	const user = useSelector(state => state.auth.user)
	const { data: orderList } = useFetchData(() => orderApi.getAll(user.id))

	return (
		<div style={{ padding: '48px 0' }}>
			<OrderList data={orderList} />
		</div>
	)
}

export default OrderPage

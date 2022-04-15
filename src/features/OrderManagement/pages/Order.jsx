import orderApi from 'api/orderApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import OrderTable from '../components/OrderTable'

function OrderPage() {
	const user = useSelector(state => state.auth.user)
	const { loading, data: orderList } = useFetchData(orderApi.getAll)

	const orderTableData = useMemo(() => {
		return orderList.map(item => ({ ...item, key: item.id }))
	}, [orderList])

	return (
		<div>
			<OrderTable user={user} loading={loading} data={orderTableData} />
		</div>
	)
}

export default OrderPage

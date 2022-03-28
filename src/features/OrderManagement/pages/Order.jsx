import orderApi from 'api/orderApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo } from 'react'
import OrderTable from '../components/OrderTable'

function OrderPage() {
	const { loading, data: orderList } = useFetchData(orderApi.getAll)

	const orderTableData = useMemo(() => {
		return orderList.map(item => ({ ...item, key: item.id }))
	}, [orderList])

	return (
		<div>
			<OrderTable loading={loading} data={orderTableData} />
		</div>
	)
}

export default OrderPage

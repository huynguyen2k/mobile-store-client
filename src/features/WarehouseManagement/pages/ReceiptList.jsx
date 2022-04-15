import receiptApi from 'api/warehouseApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import ReceiptTable from '../components/ReceiptTable'

function ReceiptListPage() {
	const user = useSelector(state => state.auth.user)

	const { loading, data } = useFetchData(receiptApi.getAll)
	const receiptList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	return (
		<>
			<ReceiptTable user={user} loading={loading} data={receiptList} />
		</>
	)
}

export default ReceiptListPage

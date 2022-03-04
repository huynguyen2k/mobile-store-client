import receiptApi from 'api/warehouseApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo } from 'react'
import ReceiptTable from '../components/ReceiptTable'

function ReceiptListPage() {
	const { loading, data, refetchData } = useFetchData(receiptApi.getAll)
	const receiptList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	return (
		<>
			<ReceiptTable loading={loading} data={receiptList} />
		</>
	)
}

export default ReceiptListPage

import useReceiptDetail from 'hooks/useReceiptDetail'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ReceiptDetailTable from '../components/ReceiptDetailTable'

function ReceiptDetailPage() {
	const { receiptId } = useParams()
	const { loading, data } = useReceiptDetail(receiptId)

	const receiptDetail = useMemo(() => {
		if (!data) return []
		if (
			!Array.isArray(data.receipt_detail) ||
			data.receipt_detail.length === 0
		) {
			return []
		}

		return data.receipt_detail.map(item => ({
			...item,
			key: item.id,
			product_option_name: `${item.ram_name} - ${item.rom_name} - ${item.color_name}`,
		}))
	}, [data])

	return (
		<>
			<ReceiptDetailTable loading={loading} data={receiptDetail} />
		</>
	)
}

export default ReceiptDetailPage

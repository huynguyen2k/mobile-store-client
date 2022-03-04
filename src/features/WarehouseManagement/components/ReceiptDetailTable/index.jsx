import { Table, Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import formatCurrency from 'utils/formatCurrency'

ReceiptDetailTable.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.bool,
}

ReceiptDetailTable.defaultProps = {
	data: [],
	loading: false,
}

function ReceiptDetailTable(props) {
	const { loading, data } = props

	return (
		<Table
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Chi tiết phiếu nhập
				</Typography.Title>
			)}
			dataSource={data}
			columns={[
				{
					title: 'ID',
					dataIndex: 'id',
				},
				{
					title: 'Tên sản phẩm',
					dataIndex: 'product_name',
				},
				{
					title: 'Tên cấu hình',
					dataIndex: 'product_option_name',
				},
				{
					title: 'Số lượng',
					dataIndex: 'quantity',
				},
				{
					title: 'Đơn giá',
					dataIndex: 'price',
					render(value) {
						return <span>{formatCurrency(value)}</span>
					},
				},
				{
					title: 'Thành tiền',
					dataIndex: 'total_price',
					render(value, record) {
						return <span>{formatCurrency(record.quantity * record.price)}</span>
					},
				},
			]}
		/>
	)
}

export default ReceiptDetailTable

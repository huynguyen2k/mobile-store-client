import { EyeOutlined, FileDoneOutlined } from '@ant-design/icons/lib/icons'
import { Avatar, Button, Space, Table, Tooltip, Typography } from 'antd'
import UserRoles from 'constants/UserRoles'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import formatCurrency from 'utils/formatCurrency'
import formatDateTime from 'utils/formatDateTime'

ReceiptTable.propTypes = {
	user: PropTypes.object,
	data: PropTypes.array,
	loading: PropTypes.bool,
}

ReceiptTable.defaultProps = {
	user: null,
	data: [],
	loading: false,
}

function ReceiptTable(props) {
	const { user, data, loading } = props

	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleSelectChange = selectedRowKeys => {
		setSelectedRowKeys(selectedRowKeys)
	}

	return (
		<Table
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Danh sách phiếu nhập
				</Typography.Title>
			)}
			rowSelection={{
				selectedRowKeys,
				onChange: handleSelectChange,
				selections: [
					Table.SELECTION_ALL,
					Table.SELECTION_INVERT,
					Table.SELECTION_NONE,
				],
			}}
			dataSource={data}
			columns={[
				{
					title: 'ID',
					dataIndex: 'id',
				},
				{
					title: 'Ngày lập phiếu',
					dataIndex: 'created_date',
					sortDirections: ['descend', 'ascend'],
					render: value => formatDateTime(value),
					sorter: (date1, date2) => {
						const moment1 = moment(
							date1.created_date,
							'YYYY-MM-DD HH:mm:ss',
							true
						)
						const moment2 = moment(
							date2.created_date,
							'YYYY-MM-DD HH:mm:ss',
							true
						)

						if (moment1.isSameOrBefore(moment2)) {
							return -1
						}
						return 1
					},
				},
				{
					title: 'Người lập phiếu',
					dataIndex: 'full_name',
					render(text, record) {
						return (
							<Space>
								<Avatar
									src={record.avatar}
									alt={text}
									shape="circle"
									size="large"
								/>
								<span>{text}</span>
							</Space>
						)
					},
				},
				{
					title: 'Nhà cung cấp',
					dataIndex: 'supplier_name',
				},
				{
					title: 'Tổng tiền',
					dataIndex: 'total_price',
					render(value) {
						return <span>{formatCurrency(value)}</span>
					},
				},
				{
					title: () => (
						<Link
							to={`${
								user?.role_name === UserRoles.ADMIN.name
									? '/admin/warehouse/add-receipt'
									: '/warehouse-manager/warehouse/add-receipt'
							}`}
						>
							<Tooltip placement="topRight" title="Thêm phiếu nhập mới">
								<Button
									type="primary"
									shape="circle"
									icon={<FileDoneOutlined />}
									style={{
										borderColor: 'var(--success)',
										backgroundColor: 'var(--success)',
									}}
								/>
							</Tooltip>
						</Link>
					),
					dataIndex: 'action',
					render: (value, record) => (
						<Link
							to={`${
								user?.role_name === UserRoles.ADMIN.name
									? `/admin/warehouse/receipt-detail/${record.id}`
									: `/warehouse-manager/warehouse/receipt-detail/${record.id}`
							}`}
						>
							<Tooltip placement="topRight" title="Xem chi tiết phiếu nhập">
								<Button
									ghost
									type="primary"
									shape="circle"
									icon={<EyeOutlined />}
									style={{
										color: 'var(--success)',
										borderColor: 'var(--success)',
									}}
								/>
							</Tooltip>
						</Link>
					),
				},
			]}
		/>
	)
}

export default ReceiptTable

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
	Button,
	Popconfirm,
	Space,
	Table,
	Tag,
	Tooltip,
	Typography,
} from 'antd'
import formatDateTime from 'utils/formatDateTime'
import moment from 'moment'
import formatCurrency from 'utils/formatCurrency'
import { DeleteOutlined, EditOutlined, GiftOutlined } from '@ant-design/icons'

CouponsTable.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	onAddCoupons: PropTypes.func,
	onUpdateCoupons: PropTypes.func,
	onDeleteCoupons: PropTypes.func,
}

CouponsTable.defaultProps = {
	loading: false,
	data: [],
	onAddCoupons: null,
	onUpdateCoupons: null,
	onDeleteCoupons: null,
}

function CouponsTable(props) {
	const { loading, data, onAddCoupons, onUpdateCoupons, onDeleteCoupons } =
		props

	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleSelectChange = selectedRowKeys => {
		setSelectedRowKeys(selectedRowKeys)
	}

	const handleAddCoupons = () => {
		if (typeof onAddCoupons === 'function') {
			onAddCoupons()
		}
	}

	const handleUpdateCoupons = data => {
		if (typeof onUpdateCoupons === 'function') {
			onUpdateCoupons(data)
		}
	}

	const handleDeleteCoupons = async idList => {
		if (typeof onDeleteCoupons === 'function') {
			await onDeleteCoupons(idList)
		}
	}

	return (
		<Table
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Mã giảm giá
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
					title: 'Ngày tạo',
					dataIndex: 'created_date',
					width: 150,
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
					title: 'mã giảm giá',
					dataIndex: 'code',
				},
				{
					title: 'Ngày bắt đầu',
					dataIndex: 'start_date',
					width: 150,
					render: value => formatDateTime(value),
				},
				{
					title: 'Ngày kết thúc',
					dataIndex: 'end_date',
					width: 150,
					render: value => formatDateTime(value),
				},
				{
					title: 'Số lượng',
					dataIndex: 'quantity',
				},
				{
					title: 'Đã sử dụng',
					dataIndex: 'used_quantity',
				},
				{
					title: 'Trị giá',
					dataIndex: 'discount_value',
					render: value => formatCurrency(value),
				},
				{
					title: 'Trạng thái',
					dataIndex: 'status',
					render: (value, record) => {
						const startDate = moment(
							record.start_date,
							'YYYY-MM-DD HH:mm:ss',
							true
						)
						const endDate = moment(record.end_date, 'YYYY-MM-DD HH:mm:ss', true)
						const currentDate = moment()
						const isActive =
							currentDate.isSameOrAfter(startDate) &&
							currentDate.isSameOrBefore(endDate) &&
							record.used_quantity < record.quantity

						return isActive ? (
							<Tag color="success">Kích hoạt</Tag>
						) : (
							<Tag color="error">Vô hiệu</Tag>
						)
					},
				},
				{
					title: () => (
						<Space wrap align="center" size="small">
							<Tooltip placement="top" title="Thêm mã giảm giá mới">
								<Button
									type="primary"
									shape="circle"
									icon={<GiftOutlined />}
									style={{
										borderColor: 'var(--success)',
										backgroundColor: 'var(--success)',
									}}
									onClick={handleAddCoupons}
								/>
							</Tooltip>

							<Tooltip placement="topRight" title="Xóa mã giảm giá đã chọn">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa các mã giảm giá đã chọn?"
									onConfirm={async () =>
										await handleDeleteCoupons(selectedRowKeys)
									}
								>
									<Button
										danger
										type="primary"
										shape="circle"
										icon={<DeleteOutlined />}
									/>
								</Popconfirm>
							</Tooltip>
						</Space>
					),
					dataIndex: 'action',
					render: (value, record) => (
						<Space wrap align="center" size="small">
							<Tooltip placement="top" title="Chỉnh sửa mã giảm giá">
								<Button
									ghost
									type="primary"
									shape="circle"
									icon={<EditOutlined />}
									onClick={() => handleUpdateCoupons(record)}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa mã giảm giá">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa mã giảm giá này không?"
									onConfirm={async () => await handleDeleteCoupons([record.id])}
								>
									<Button
										ghost
										danger
										type="primary"
										shape="circle"
										icon={<DeleteOutlined />}
									/>
								</Popconfirm>
							</Tooltip>
						</Space>
					),
				},
			]}
		/>
	)
}

export default CouponsTable

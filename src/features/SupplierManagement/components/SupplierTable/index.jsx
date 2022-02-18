import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Popconfirm, Space, Table, Tooltip, Typography } from 'antd'
import formatDateTime from 'utils/formatDateTime'
import moment from 'moment'
import {
	DeleteOutlined,
	EditOutlined,
	InboxOutlined,
} from '@ant-design/icons/lib/icons'

SupplierTable.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	onAddSupplier: PropTypes.func,
	onUpdateSupplier: PropTypes.func,
	onDeleteSupplier: PropTypes.func,
}

SupplierTable.defaultProps = {
	loading: false,
	data: [],
	onAddSupplier: null,
	onUpdateSupplier: null,
	onDeleteSupplier: null,
}

function SupplierTable(props) {
	const { loading, data, onAddSupplier, onUpdateSupplier, onDeleteSupplier } =
		props

	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleSelectChange = selectedRowKeys => {
		setSelectedRowKeys(selectedRowKeys)
	}

	const handleAddSupplier = () => {
		if (typeof onAddSupplier === 'function') {
			onAddSupplier()
		}
	}

	const handleUpdateSupplier = data => {
		if (typeof onUpdateSupplier === 'function') {
			onUpdateSupplier(data)
		}
	}

	const handleDeleteSupplier = async idList => {
		if (typeof onDeleteSupplier === 'function') {
			await onDeleteSupplier(idList)
		}
	}

	return (
		<Table
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Nhà cung cấp
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
					title: 'Tên nhà cung cấp',
					dataIndex: 'name',
					width: 200,
				},
				{
					title: 'Số điện thoại',
					dataIndex: 'phone_number',
				},
				{
					title: 'Mô tả',
					dataIndex: 'description',
					width: 300,
				},
				{
					title: 'Địa chỉ',
					dataIndex: 'address',
					width: 250,
					render: (value, record) => (
						<Typography.Text>
							{`
								${record.address} - 
								${record.ward_name} - 
								${record.district_name} - 
								${record.province_name}
							`}
						</Typography.Text>
					),
				},
				{
					title: () => (
						<Space wrap align="center" size="small">
							<Tooltip placement="top" title="Thêm nhà cung cấp">
								<Button
									type="primary"
									shape="circle"
									icon={<InboxOutlined />}
									style={{
										borderColor: 'var(--success)',
										backgroundColor: 'var(--success)',
									}}
									onClick={handleAddSupplier}
								/>
							</Tooltip>

							<Tooltip placement="topRight" title="Xóa nhà cung cấp đã chọn">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa các nhà cung cấp đã chọn?"
									onConfirm={async () =>
										await handleDeleteSupplier(selectedRowKeys)
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
							<Tooltip placement="top" title="Chỉnh sửa nhà cung cấp">
								<Button
									ghost
									type="primary"
									shape="circle"
									icon={<EditOutlined />}
									onClick={() => handleUpdateSupplier(record)}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa nhà cung cấp">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa nhà cung cấp này không?"
									onConfirm={async () =>
										await handleDeleteSupplier([record.id])
									}
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

export default SupplierTable

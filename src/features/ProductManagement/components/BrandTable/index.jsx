import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {
	Button,
	Popconfirm,
	Space,
	Switch,
	Table,
	Tooltip,
	Typography,
} from 'antd'
import formatDateTime from 'utils/formatDateTime'
import moment from 'moment'
import {
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	StarOutlined,
} from '@ant-design/icons/lib/icons'

BrandTable.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	onAddBrand: PropTypes.func,
	onUpdateBrand: PropTypes.func,
	onDeleteBrand: PropTypes.func,
	onChangePublicStatus: PropTypes.func,
}

BrandTable.defaultProps = {
	loading: false,
	data: [],
	onAddBrand: null,
	onUpdateBrand: null,
	onDeleteBrand: null,
	onChangePublicStatus: null,
}

function BrandTable(props) {
	const {
		loading,
		data,
		onAddBrand,
		onUpdateBrand,
		onDeleteBrand,
		onChangePublicStatus,
	} = props

	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleSelectChange = selectedRowKeys => {
		setSelectedRowKeys(selectedRowKeys)
	}

	const handleChangePublicStatus = data => {
		if (typeof onChangePublicStatus === 'function') {
			onChangePublicStatus(data)
		}
	}

	const handleAddBrand = () => {
		if (typeof onAddBrand === 'function') {
			onAddBrand()
		}
	}

	const handleUpdateBrand = data => {
		if (typeof onUpdateBrand === 'function') {
			onUpdateBrand(data)
		}
	}

	const handleDeleteBrand = async idList => {
		if (typeof onDeleteBrand === 'function') {
			await onDeleteBrand(idList)
		}
	}

	return (
		<Table
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Thương hiệu
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
					title: 'Tên thương hiệu',
					dataIndex: 'name',
				},
				{
					title: 'Hiển thị',
					dataIndex: 'published',
					render: (value, record) => (
						<Switch
							checked={!!value}
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
							onChange={checked =>
								handleChangePublicStatus({
									id: record.id,
									published: Number(checked),
								})
							}
						/>
					),
				},
				{
					title: () => (
						<Space wrap align="center" size="small">
							<Tooltip placement="top" title="Thêm thương hiệu mới">
								<Button
									type="primary"
									shape="circle"
									icon={<StarOutlined />}
									style={{
										borderColor: 'var(--success)',
										backgroundColor: 'var(--success)',
									}}
									onClick={handleAddBrand}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa thương hiệu đã chọn">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa các thương hiệu đã chọn?"
									onConfirm={async () =>
										await handleDeleteBrand(selectedRowKeys)
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
							<Tooltip placement="top" title="Chỉnh sửa thương hiệu">
								<Button
									ghost
									type="primary"
									shape="circle"
									icon={<EditOutlined />}
									onClick={() => handleUpdateBrand(record)}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa thương hiệu">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa thương hiệu này không?"
									onConfirm={async () => await handleDeleteBrand([record.id])}
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

export default BrandTable

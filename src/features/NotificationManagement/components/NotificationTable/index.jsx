import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
	Avatar,
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
	BellOutlined,
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons'

NotificationTable.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	onAddNotification: PropTypes.func,
	onUpdateNotification: PropTypes.func,
	onDeleteNotification: PropTypes.func,
	onChangePublicStatus: PropTypes.func,
}

NotificationTable.defaultProps = {
	loading: false,
	data: [],
	onAddNotification: null,
	onUpdateNotification: null,
	onDeleteNotification: null,
	onChangePublicStatus: null,
}

function NotificationTable(props) {
	const {
		loading,
		data,
		onAddNotification,
		onUpdateNotification,
		onDeleteNotification,
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

	const handleAddNotification = () => {
		if (typeof onAddNotification === 'function') {
			onAddNotification()
		}
	}

	const handleUpdateNotification = data => {
		if (typeof onUpdateNotification === 'function') {
			onUpdateNotification(data)
		}
	}

	const handleDeleteNotification = async idList => {
		if (typeof onDeleteNotification === 'function') {
			await onDeleteNotification(idList)
		}
	}

	return (
		<Table
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Thông báo khách hàng
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
					title: 'Tiêu đề',
					dataIndex: 'title',
					width: '15%',
				},
				{
					title: 'Nội dung',
					dataIndex: 'content',
					width: '25%',
				},
				{
					title: 'Người tạo',
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
							<Tooltip placement="top" title="Thêm thông báo mới">
								<Button
									type="primary"
									shape="circle"
									icon={<BellOutlined />}
									style={{
										borderColor: 'var(--success)',
										backgroundColor: 'var(--success)',
									}}
									onClick={handleAddNotification}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa thông báo đã chọn">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa các thông báo đã chọn?"
									onConfirm={async () =>
										await handleDeleteNotification(selectedRowKeys)
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
							<Tooltip placement="top" title="Chỉnh sửa thông báo">
								<Button
									ghost
									type="primary"
									shape="circle"
									icon={<EditOutlined />}
									onClick={() => handleUpdateNotification(record)}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa thông báo">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa thông báo này không?"
									onConfirm={async () =>
										await handleDeleteNotification([record.id])
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

export default NotificationTable

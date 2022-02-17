import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
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
	AreaChartOutlined,
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons/lib/icons'

BannerTable.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	onAddBanner: PropTypes.func,
	onUpdateBanner: PropTypes.func,
	onDeleteBanner: PropTypes.func,
	onChangePublicStatus: PropTypes.func,
}

BannerTable.defaultProps = {
	loading: false,
	data: [],
	onAddBanner: null,
	onUpdateBanner: null,
	onDeleteBanner: null,
	onChangePublicStatus: null,
}

function BannerTable(props) {
	const {
		loading,
		data,
		onAddBanner,
		onUpdateBanner,
		onDeleteBanner,
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

	const handleAddBanner = () => {
		if (typeof onAddBanner === 'function') {
			onAddBanner()
		}
	}

	const handleUpdateBanner = data => {
		if (typeof onUpdateBanner === 'function') {
			onUpdateBanner(data)
		}
	}

	const handleDeleteBanner = async idList => {
		if (typeof onDeleteBanner === 'function') {
			await onDeleteBanner(idList)
		}
	}

	return (
		<Table
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Banner trang chủ
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
					title: 'Ảnh banner',
					dataIndex: 'image',
					render: (value, record) => (
						<Avatar src={value} alt={record.name} shape="square" size={128} />
					),
				},
				{
					title: 'Tên banner',
					dataIndex: 'name',
					width: 300,
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
							<Tooltip placement="top" title="Thêm banner mới">
								<Button
									type="primary"
									shape="circle"
									icon={<AreaChartOutlined />}
									style={{
										borderColor: 'var(--success)',
										backgroundColor: 'var(--success)',
									}}
									onClick={handleAddBanner}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa banner đã chọn">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa các banner đã chọn?"
									onConfirm={async () =>
										await handleDeleteBanner(selectedRowKeys)
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
							<Tooltip placement="top" title="Chỉnh sửa banner">
								<Button
									ghost
									type="primary"
									shape="circle"
									icon={<EditOutlined />}
									onClick={() => handleUpdateBanner(record)}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa banner">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa banner này không?"
									onConfirm={async () => await handleDeleteBanner([record.id])}
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

export default BannerTable

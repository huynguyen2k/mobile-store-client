import {
	DeleteOutlined,
	EditOutlined,
	SearchOutlined,
	UserAddOutlined,
} from '@ant-design/icons/lib/icons'
import {
	Avatar,
	Button,
	Input,
	Popconfirm,
	Space,
	Table,
	Tag,
	Typography,
	Tooltip,
} from 'antd'
import UserRoles from 'constants/UserRoles'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import formatDateTime from 'utils/formatDateTime'
import Highlighter from 'react-highlight-words'
import './style.scss'
import moment from 'moment'

StaffTable.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.bool,
	roleList: PropTypes.array,
	onAddStaff: PropTypes.func,
	onUpdateStaff: PropTypes.func,
	onDeleteStaff: PropTypes.func,
}

StaffTable.defaultProps = {
	data: [],
	loading: false,
	roleList: [],
	onAddStaff: null,
	onUpdateStaff: null,
	onDeleteStaff: null,
}

function StaffTable(props) {
	const { data, loading, roleList, onAddStaff, onUpdateStaff, onDeleteStaff } =
		props

	const [searchText, setSearchText] = useState('')
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleSelectChange = selectedRowKeys => {
		setSelectedRowKeys(selectedRowKeys)
	}

	const handleSearch = (selectedKeys, confirm) => {
		confirm()
		setSearchText(selectedKeys[0])
	}

	const handleReset = (confirm, setSelectedKeys) => {
		setSelectedKeys([])
		confirm()
		setSearchText('')
	}

	const handleTableChange = (paginations, filters, sorter, extra) => {
		if (extra.action === 'filter') {
			setSelectedRowKeys([])
		}
	}

	const handleAddStaff = () => {
		if (typeof onAddStaff === 'function') {
			onAddStaff()
		}
	}

	const handleUpdateStaff = data => {
		if (typeof onUpdateStaff === 'function') {
			onUpdateStaff(data)
		}
	}

	const handleDeleteStaff = async idList => {
		if (typeof onDeleteStaff === 'function') {
			await onDeleteStaff(idList)
		}
	}

	const getColumnSearchProps = (dataIndex, placeholder = '') => ({
		filterDropdown: ({ confirm, selectedKeys, setSelectedKeys }) => (
			<div style={{ padding: 8 }}>
				<Input
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					placeholder={placeholder}
					style={{ marginBottom: 8, display: 'block' }}
					onPressEnter={() => handleSearch(selectedKeys, confirm)}
				/>

				<Space>
					<Button
						size="small"
						type="primary"
						style={{ width: 90 }}
						onClick={() => handleSearch(selectedKeys, confirm)}
					>
						Tìm kiếm
					</Button>
					<Button
						danger
						size="small"
						type="primary"
						style={{ width: 90 }}
						onClick={() => handleReset(confirm, setSelectedKeys)}
					>
						Hủy bỏ
					</Button>
				</Space>
			</div>
		),
		filterIcon: filtered => (
			<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) => {
			return record[dataIndex]
				? record[dataIndex]
						.toString()
						.toLowerCase()
						.normalize()
						.includes(value.toLowerCase().normalize())
				: ''
		},
	})

	return (
		<Table
			className="staff-table"
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Nhân viên
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
			onChange={handleTableChange}
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
					title: 'Họ tên',
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
								<span>
									<Highlighter
										autoEscape
										sanitize={text => text.normalize()}
										highlightStyle={{
											padding: 0,
											backgroundColor: 'var(--mark-color)',
										}}
										searchWords={[searchText]}
										textToHighlight={text ? text.toString().normalize() : ''}
									/>
								</span>
							</Space>
						)
					},
					...getColumnSearchProps('full_name', 'Nhập tên nhân viên'),
				},
				{
					title: 'Email',
					dataIndex: 'email',
				},
				{
					title: 'Số điện thoại',
					dataIndex: 'phone_number',
				},
				{
					title: 'Vai trò',
					dataIndex: 'role_name',
					render: value => {
						let color = 'default'

						if (value === UserRoles.ADMIN.name) {
							color = 'var(--primary)'
						} else if (value === UserRoles.SALESMAN.name) {
							color = 'var(--success)'
						} else {
							color = 'var(--gray)'
						}

						return <Tag color={color}>{value.toUpperCase()}</Tag>
					},
					filters: roleList
						.filter(
							roleItem =>
								roleItem.name.toLowerCase().normalize() !==
								UserRoles.CUSTOMER.name.toLowerCase().normalize()
						)
						.map(roleItem => ({
							value: roleItem.id,
							text: roleItem.name,
						})),
					onFilter: (value, record) => value === record.role_id,
				},
				{
					title: () => (
						<Space wrap align="center" size="small">
							<Tooltip placement="top" title="Thêm nhân viên mới">
								<Button
									type="primary"
									shape="circle"
									icon={<UserAddOutlined />}
									style={{
										borderColor: 'var(--success)',
										backgroundColor: 'var(--success)',
									}}
									onClick={handleAddStaff}
								/>
							</Tooltip>

							<Tooltip placement="topRight" title="Xóa nhân viên đã chọn">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa các nhân viên đã chọn?"
									onConfirm={async () =>
										await handleDeleteStaff(selectedRowKeys)
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
							<Tooltip placement="top" title="Chỉnh sửa nhân viên">
								<Button
									ghost
									type="primary"
									shape="circle"
									icon={<EditOutlined />}
									onClick={() => handleUpdateStaff(record)}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa nhân viên">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa nhân viên này không?"
									onConfirm={async () => await handleDeleteStaff([record.id])}
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

export default StaffTable

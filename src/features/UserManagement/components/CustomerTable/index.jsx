import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {
	Avatar,
	Button,
	Input,
	Popconfirm,
	Space,
	Table,
	Tooltip,
	Typography,
} from 'antd'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons/lib/icons'
import formatDateTime from 'utils/formatDateTime'
import moment from 'moment'
import Highlighter from 'react-highlight-words'

CustomerTable.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	onDeleteCustomer: PropTypes.func,
}

CustomerTable.defaultProps = {
	loading: false,
	data: [],
	onDeleteCustomer: null,
}

function CustomerTable({ loading, data, onDeleteCustomer }) {
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

	const handleDeleteCustomer = async idList => {
		if (typeof onDeleteCustomer === 'function') {
			await onDeleteCustomer(idList)
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
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Khách hàng
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
					...getColumnSearchProps('full_name', 'Nhập tên khách hàng'),
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
					title: () => (
						<Tooltip placement="topRight" title="Xóa khách hàng đã chọn">
							<Popconfirm
								okText="Có"
								cancelText="Không"
								placement="topRight"
								title="Bạn có chắc là muốn xóa các khách hàng đã chọn?"
								onConfirm={async () =>
									await handleDeleteCustomer(selectedRowKeys)
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
					),
					dataIndex: 'action',
					render: (value, record) => (
						<Tooltip placement="top" title="Xóa khách hàng">
							<Popconfirm
								okText="Có"
								cancelText="Không"
								placement="topRight"
								title="Bạn có chắc là muốn xóa khách hàng này không?"
								onConfirm={async () => await handleDeleteCustomer([record.id])}
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
					),
				},
			]}
		/>
	)
}

export default CustomerTable

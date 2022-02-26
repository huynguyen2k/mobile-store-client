import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
	Button,
	Input,
	Popconfirm,
	Space,
	Table,
	Tooltip,
	Typography,
} from 'antd'
import {
	DeleteOutlined,
	EditOutlined,
	SearchOutlined,
	SettingOutlined,
} from '@ant-design/icons/lib/icons'
import formatCurrency from 'utils/formatCurrency'
import Highlighter from 'react-highlight-words'

OptionTable.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	onAddOption: PropTypes.func,
	onUpdateOption: PropTypes.func,
	onDeleteOption: PropTypes.func,
}

OptionTable.defaultProps = {
	loading: false,
	data: [],
	onAddOption: null,
	onUpdateOption: null,
	onDeleteOption: null,
}

function OptionTable(props) {
	const { loading, data, onAddOption, onUpdateOption, onDeleteOption } = props

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

	const handleAddOption = () => {
		if (typeof onAddOption === 'function') {
			onAddOption()
		}
	}

	const handleUpdateOption = data => {
		if (typeof onUpdateOption === 'function') {
			onUpdateOption(data)
		}
	}

	const handleDeleteOption = async idList => {
		if (typeof onDeleteOption === 'function') {
			await onDeleteOption(idList)
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
					Chi tiết cấu hình
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
					title: 'RAM - ROM - Màu sắc',
					dataIndex: 'option_name',
					render: text => (
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
					),
					...getColumnSearchProps('option_name', 'Nhập tên cấu hình'),
				},
				{
					title: 'Trong kho',
					dataIndex: 'quantity',
					render: (quantity, record) => (
						<Typography.Text>{quantity - record.sold_quantity}</Typography.Text>
					),
				},
				{
					title: 'Đã bán',
					dataIndex: 'sold_quantity',
					render: value => <Typography.Text>{value}</Typography.Text>,
				},
				{
					title: 'Giá gốc',
					dataIndex: 'original_price',
					render: value => (
						<Typography.Text>{formatCurrency(value)}</Typography.Text>
					),
				},
				{
					title: 'Giá khuyến mãi',
					dataIndex: 'sale_price',
					render: value => (
						<Typography.Text>{formatCurrency(value)}</Typography.Text>
					),
				},
				{
					title: () => (
						<Space wrap align="center" size="small">
							<Tooltip placement="top" title="Thêm cấu hình mới">
								<Button
									type="primary"
									shape="circle"
									icon={<SettingOutlined />}
									style={{
										borderColor: 'var(--success)',
										backgroundColor: 'var(--success)',
									}}
									onClick={handleAddOption}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa cấu hình đã chọn">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa các cấu hình đã chọn?"
									onConfirm={async () =>
										await handleDeleteOption(selectedRowKeys)
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
							<Tooltip placement="top" title="Chỉnh sửa cấu hình">
								<Button
									ghost
									type="primary"
									shape="circle"
									icon={<EditOutlined />}
									onClick={() => handleUpdateOption(record)}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa cấu hình">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa cấu hình này không?"
									onConfirm={async () => await handleDeleteOption([record.id])}
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

export default OptionTable

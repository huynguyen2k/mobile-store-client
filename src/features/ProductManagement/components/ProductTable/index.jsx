import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
	Avatar,
	Button,
	Dropdown,
	Input,
	Menu,
	Popconfirm,
	Space,
	Switch,
	Table,
	Tooltip,
	Typography,
} from 'antd'
import {
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	MobileOutlined,
	SearchOutlined,
} from '@ant-design/icons/lib/icons'
import formatDateTime from 'utils/formatDateTime'
import moment from 'moment'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'
import UserRoles from 'constants/UserRoles'

ProductTable.propTypes = {
	user: PropTypes.object,
	loading: PropTypes.bool,
	data: PropTypes.array,
	onDeleteProduct: PropTypes.func,
	onChangePublicStatus: PropTypes.func,
}

ProductTable.defaultProps = {
	user: null,
	loading: false,
	data: [],
	onDeleteProduct: null,
	onChangePublicStatus: null,
}

function ProductTable(props) {
	const { user, loading, data, onChangePublicStatus, onDeleteProduct } = props
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

	const handleChangePublicStatus = data => {
		if (typeof onChangePublicStatus === 'function') {
			onChangePublicStatus(data)
		}
	}

	const handleDeleteProduct = async idList => {
		if (typeof onDeleteProduct === 'function') {
			await onDeleteProduct(idList)
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
					Danh sách sản phẩm
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
					title: 'Thương hiệu',
					dataIndex: 'brand_name',
				},
				{
					title: 'Tên sản phẩm',
					dataIndex: 'name',
					render(text, record) {
						return (
							<Space>
								<Avatar
									src={record.images[0].image}
									alt={text}
									shape="square"
									size={80}
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
					...getColumnSearchProps('name', 'Nhập tên sản phẩm'),
				},
				{
					title: 'Trong kho',
					dataIndex: 'product_options',
					render: productOption => (
						<Typography.Text>
							{productOption.reduce(
								(result, option) =>
									result + (option.quantity - option.sold_quantity),
								0
							)}
						</Typography.Text>
					),
				},
				{
					title: 'Đã bán',
					dataIndex: 'product_options',
					render: productOption => (
						<Typography.Text>
							{productOption.reduce(
								(result, option) => result + option.sold_quantity,
								0
							)}
						</Typography.Text>
					),
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
							<Link
								to={`${
									user?.role_name === UserRoles.ADMIN.name
										? '/admin/product/add-product'
										: '/warehouse-manager/product/add-product'
								}`}
							>
								<Tooltip placement="top" title="Thêm sản phẩm mới">
									<Button
										type="primary"
										shape="circle"
										icon={<MobileOutlined />}
										style={{
											borderColor: 'var(--success)',
											backgroundColor: 'var(--success)',
										}}
									/>
								</Tooltip>
							</Link>

							<Tooltip placement="top" title="Xóa sản phẩm đã chọn">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa các sản phẩm đã chọn?"
									onConfirm={async () =>
										await handleDeleteProduct(selectedRowKeys)
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
							<Dropdown
								arrow
								placement="bottomCenter"
								overlay={
									<Menu>
										<Menu.Item key={1}>
											<Link
												to={`${
													user?.role_name === UserRoles.ADMIN.name
														? `/admin/product/product-detail/${record.id}`
														: `/warehouse-manager/product/product-detail/${record.id}`
												}`}
											>
												Xem chi tiết sản phẩm
											</Link>
										</Menu.Item>
										<Menu.Item key={2}>
											<Link
												to={`${
													user?.role_name === UserRoles.ADMIN.name
														? `/admin/product/option-detail/${record.id}`
														: `/warehouse-manager/product/option-detail/${record.id}`
												}`}
											>
												Xem chi tiết cấu hình
											</Link>
										</Menu.Item>
									</Menu>
								}
							>
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
							</Dropdown>

							<Link
								to={`${
									user?.role_name === UserRoles.ADMIN.name
										? `/admin/product/update-product/${record.id}`
										: `/warehouse-manager/product/update-product/${record.id}`
								}`}
							>
								<Tooltip placement="top" title="Chỉnh sửa sản phẩm">
									<Button
										ghost
										type="primary"
										shape="circle"
										icon={<EditOutlined />}
									/>
								</Tooltip>
							</Link>

							<Tooltip placement="top" title="Xóa sản phẩm">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa sản phẩm này không?"
									onConfirm={async () => await handleDeleteProduct([record.id])}
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

export default ProductTable

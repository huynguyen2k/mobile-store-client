import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {
	Avatar,
	Button,
	Popconfirm,
	Rate,
	Space,
	Table,
	Tooltip,
	Typography,
} from 'antd'
import formatDateTime from 'utils/formatDateTime'
import moment from 'moment'
import { DeleteOutlined } from '@ant-design/icons'

RatingTable.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	onDelete: PropTypes.func,
}

RatingTable.defaultProps = {
	loading: false,
	data: [],
	onDelete: null,
}

function RatingTable({ loading, data, onDelete }) {
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleSelectChange = selectedRowKeys => {
		setSelectedRowKeys(selectedRowKeys)
	}

	const handleDeleteRating = async idList => {
		if (onDelete) {
			await onDelete(idList)
		}
	}

	return (
		<Table
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Đánh giá từ khách hàng
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
					title: 'Khách hàng',
					dataIndex: 'avatar',
					render(avatar, record) {
						return (
							<Space>
								<Avatar
									src={avatar}
									alt={record.full_name}
									shape="circle"
									size="large"
								/>
								<span>{record.full_name}</span>
							</Space>
						)
					},
				},
				{
					title: 'Sản phẩm',
					dataIndex: 'product_image',
					render(productImage, record) {
						return (
							<Space>
								<Avatar
									src={productImage}
									alt={record.product_name}
									shape="square"
									size={96}
								/>
								<span>{record.product_name}</span>
							</Space>
						)
					},
				},
				{
					title: 'Số sao đánh giá',
					dataIndex: 'rating',
					render(value) {
						return (
							<Rate
								disabled
								allowHalf
								defaultValue={value}
								style={{ fontSize: '1rem' }}
							/>
						)
					},
				},
				{
					title: 'Nội dung',
					dataIndex: 'content',
					width: '25%',
				},
				{
					title: () => (
						<Space wrap align="center" size="small">
							<Tooltip placement="top" title="Xóa đánh giá đã chọn">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa các đánh giá đã chọn?"
									onConfirm={async () =>
										await handleDeleteRating(selectedRowKeys)
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
							<Tooltip placement="top" title="Xóa đánh giá">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa đánh giá này không?"
									onConfirm={async () => await handleDeleteRating([record.id])}
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

export default RatingTable

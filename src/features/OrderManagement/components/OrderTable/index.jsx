import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Avatar, Button, Space, Table, Tag, Tooltip, Typography } from 'antd'
import formatDateTime from 'utils/formatDateTime'
import moment from 'moment'
import formatCurrency from 'utils/formatCurrency'
import { Link } from 'react-router-dom'
import { EyeOutlined } from '@ant-design/icons'
import orderStatus from 'constants/orderStatus'
import UserRoles from 'constants/UserRoles'

OrderTable.propTypes = {
	user: PropTypes.object,
	loading: PropTypes.bool,
	data: PropTypes.array,
}

OrderTable.defaultProps = {
	user: null,
	loading: false,
	data: [],
}

function OrderTable(props) {
	const { user, loading, data } = props

	return (
		<Table
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					Danh sách đơn hàng
				</Typography.Title>
			)}
			dataSource={data}
			columns={[
				{
					title: 'ID',
					dataIndex: 'id',
				},
				{
					title: 'Ngày đặt hàng',
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
					dataIndex: 'customer_name',
					render(text, record) {
						return (
							<Space>
								<Avatar
									src={record.customer_avatar}
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
					title: 'Số điện thoại',
					dataIndex: 'customer_phone',
				},
				{
					title: 'Địa chỉ giao hàng',
					dataIndex: 'customer_address',
					width: 250,
				},
				{
					title: 'Thanh toán',
					dataIndex: 'total_price',
					render(value) {
						return (
							<span style={{ fontWeight: 400, fontSize: '1rem' }}>
								{formatCurrency(value)}
							</span>
						)
					},
				},
				{
					title: 'Trạng thái',
					dataIndex: 'status_name',
					render(value, record) {
						let color = ''

						if (record.status_id === orderStatus.waiting.id) {
							color = 'var(--orange)'
						}
						if (record.status_id === orderStatus.processing.id) {
							color = 'var(--primary)'
						}
						if (record.status_id === orderStatus.delivering.id) {
							color = 'var(--gray)'
						}
						if (record.status_id === orderStatus.delivered.id) {
							color = 'var(--cyan)'
						}
						if (record.status_id === orderStatus.completed.id) {
							color = 'var(--success)'
						}
						if (record.status_id === orderStatus.cancelled.id) {
							color = 'var(--secondary)'
						}

						return <Tag color={color}>{value}</Tag>
					},
				},
				{
					title: 'Thao tác',
					dataIndex: 'action',
					render: (value, record) => (
						<Space wrap align="center" size="small">
							<Link
								to={`${
									user.role_name === UserRoles.ADMIN.name
										? `/admin/order/${record.id}`
										: `/salesman/order/${record.id}`
								}`}
							>
								<Tooltip placement="top" title="Xem chi tiết đơn hàng">
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
								</Tooltip>
							</Link>
						</Space>
					),
				},
			]}
		/>
	)
}

export default OrderTable

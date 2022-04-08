import {
	DollarOutlined,
	MobileOutlined,
	ShoppingCartOutlined,
	StarOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Col, Row } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import StatisticItem from '../StatisticItem'
import './style.scss'
import formatCurrency from 'utils/formatCurrency'

StatisticList.propTypes = {
	data: PropTypes.object,
}

StatisticList.defaultProps = {
	data: null,
}

function StatisticList({ data }) {
	if (!data) return null
	return (
		<Row gutter={[16, 16]}>
			<Col span={8}>
				<StatisticItem
					type="primary"
					icon={<DollarOutlined />}
					title="Tổng doanh thu"
					content={formatCurrency(data.total_price)}
				/>
			</Col>
			<Col span={8}>
				<StatisticItem
					type="orange"
					icon={<StarOutlined />}
					title="Thương hiệu"
					content={String(data.total_brand)}
				/>
			</Col>
			<Col span={8}>
				<StatisticItem
					type="success"
					icon={<MobileOutlined />}
					title="Sản phẩm"
					content={String(data.total_product)}
				/>
			</Col>
			<Col span={8}>
				<StatisticItem
					type="warning"
					icon={<UserOutlined />}
					title="Khách hàng"
					content={String(data.total_customer)}
				/>
			</Col>
			<Col span={8}>
				<StatisticItem
					type="danger"
					icon={<UserOutlined />}
					title="Nhân viên"
					content={String(data.total_staff)}
				/>
			</Col>
			<Col span={8}>
				<StatisticItem
					type="gray"
					icon={<ShoppingCartOutlined />}
					title="Đơn hàng"
					content={String(data.total_order)}
				/>
			</Col>
		</Row>
	)
}

export default StatisticList

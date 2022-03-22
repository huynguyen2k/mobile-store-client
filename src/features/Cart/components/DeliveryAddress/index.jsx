import { Button } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Link } from 'react-router-dom'

DeliveryAddress.propTypes = {
	data: PropTypes.object,
}

DeliveryAddress.defaultProps = {
	data: null,
}

function DeliveryAddress({ data }) {
	return (
		<div className="delivery-address">
			<div className="delivery-address__header">
				<span className="title">Địa chỉ giao hàng</span>
				{data ? (
					<Link to="/customer/address">
						<Button type="primary">Sửa</Button>
					</Link>
				) : (
					<Link to="/customer/address">
						<Button type="primary">Thêm</Button>
					</Link>
				)}
			</div>

			<div className="delivery-address__line-break"></div>

			<div className="delivery-address__content">
				{data ? (
					<>
						<h4 className="customer">{data.full_name}</h4>
						<span className="phone-number">
							Điện thoại: {data.phone_number}
						</span>
						<span className="address">Địa chỉ: {data.full_address}</span>
					</>
				) : (
					<span>Hiện chưa có địa chỉ</span>
				)}
			</div>
		</div>
	)
}

export default DeliveryAddress

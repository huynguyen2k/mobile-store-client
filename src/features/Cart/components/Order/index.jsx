import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import formatCurrency from 'utils/formatCurrency'

Order.propTypes = {
	data: PropTypes.object,
}

Order.defaultProps = {
	data: null,
}

function Order({ data }) {
	if (!data) return null
	return (
		<div className="order">
			<div className="order__header">
				<span className="title">Đơn hàng</span>
				<span className="product-quantity">{data.total_product} sản phẩm</span>
			</div>

			<div className="order__line-break"></div>

			<div className="order__content">
				<div className="row">
					<span className="label">Tạm tính</span>
					<span className="value">{formatCurrency(data.total_price)}</span>
				</div>

				<div className="row">
					<span className="label">Phí vận chuyển</span>
					<span className="value">{formatCurrency(data.delivery_cost)}</span>
				</div>

				<div className="row">
					<span className="label">Giảm giá</span>
					<span className="value discount">
						-{formatCurrency(data.discount)}
					</span>
				</div>

				<div className="row">
					<span className="label total-price-label">Thành tiền</span>
					<span className="value total-price-value">
						{formatCurrency(data.final_price)}
					</span>
				</div>
			</div>
		</div>
	)
}

export default Order

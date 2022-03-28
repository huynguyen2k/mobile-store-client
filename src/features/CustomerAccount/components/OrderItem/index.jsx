import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import formatCurrency from 'utils/formatCurrency'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

OrderItem.propTypes = {
	data: PropTypes.object,
}

OrderItem.defaultProps = {
	data: null,
}

function OrderItem({ data }) {
	const navigate = useNavigate()

	if (!data) return null
	return (
		<div className="order-item">
			<h3 className="order-item__title">{data.status_name}</h3>

			<div className="order-item__content">
				{data.orderDetail.map(e => (
					<div key={e.id} className="order-item__product-item">
						<div className="image">
							<img src={e.product_image} alt={e.product_name} />
						</div>

						<div className="info">
							<h4 className="product-name">{e.product_name}</h4>
							<span className="product-option">
								{`${e.ram_name} - ${e.rom_name} - ${e.color_name}`}
							</span>
							<span className="product-quantity">Số lượng: {e.quantity}</span>
						</div>

						<span className="price">{formatCurrency(e.price)}</span>
					</div>
				))}
			</div>

			<div className="order-item__footer">
				<span className="total-price">
					Tổng tiền: <span>{formatCurrency(data.total_price)}</span>
				</span>

				<Button
					type="primary"
					size="large"
					style={{ marginTop: 8 }}
					onClick={() => navigate(`/customer/order/${data.id}`)}
				>
					Xem chi tiết
				</Button>
			</div>
		</div>
	)
}

export default OrderItem

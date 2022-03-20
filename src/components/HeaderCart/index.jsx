import { Badge } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { useNavigate } from 'react-router-dom'

HeaderCart.propTypes = {
	quantity: PropTypes.number,
}

HeaderCart.defaultProps = {
	quantity: 0,
}

function HeaderCart({ quantity }) {
	const navigate = useNavigate()

	return (
		<div className="header-cart" onClick={() => navigate('/customer/cart')}>
			<Badge showZero overflowCount={99} count={quantity}>
				<img
					src="/assets/images/shopping-cart-icon.png"
					alt="cart icon"
					className="icon"
				/>
			</Badge>
			<span className="title">Giỏ hàng</span>
		</div>
	)
}

export default HeaderCart

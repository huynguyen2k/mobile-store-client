import { Badge } from 'antd'
import React from 'react'
import './style.scss'

function HeaderCart() {
	return (
		<div className="header-cart">
			<Badge count={1000} size="small">
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

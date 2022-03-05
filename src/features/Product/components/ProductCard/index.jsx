import { Rate } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import formatCurrency from 'utils/formatCurrency'
import { Link } from 'react-router-dom'
import './style.scss'
import getPromotionPercent from 'utils/getPromotionPercent'

ProductCart.propTypes = {
	data: PropTypes.object,
}

ProductCart.defaultProps = {
	data: null,
}

function ProductCart({ data }) {
	const renderProductPrice = () => {
		if (!data || !data.product_options.length) return null

		const productOption = data.product_options[0]
		const salePrice = productOption.sale_price
		const originalPrice = productOption.original_price

		return (
			<div className="product-price">
				<span className="sale-price">{formatCurrency(salePrice)}</span>

				{originalPrice > salePrice && (
					<span className="promotion-percent">
						-{getPromotionPercent(originalPrice, salePrice).toFixed(0)}%
					</span>
				)}
			</div>
		)
	}

	if (!data) return null
	return (
		<Link className="product-cart" to={`/product-detail/${data.id}`}>
			<div className="product-cart__thumbnail">
				<img src={data.images[0].image} alt={data.name} />
			</div>

			<div className="product-cart__info">
				<h3 className="product-name">{data.name}</h3>

				<div className="rating-wrap">
					<Rate allowHalf disabled defaultValue={2.5} className="rating" />
					<span className="break"></span>
					<span className="sold-quantity">Đã bán 100</span>
				</div>

				{renderProductPrice()}
			</div>
		</Link>
	)
}

export default ProductCart

import { Col, Row } from 'antd'
import ProductInfo from 'components/ProductInfo'
import SingleSlider from 'components/SingleSlider'
import PropTypes from 'prop-types'
import React from 'react'
import './style.scss'

ProductDetail.propTypes = {
	data: PropTypes.object,
	onBuyProduct: PropTypes.func,
}

ProductDetail.defaultProps = {
	data: null,
	onBuyProduct: null,
}

function ProductDetail({ data, onBuyProduct }) {
	if (!data) return null
	return (
		<div className="product-detail">
			<Row>
				<Col flex="600px">
					<div className="product-detail__left-col">
						<SingleSlider
							style={{ width: 'calc(600px - 32px)' }}
							images={data.images.slice(1).map(image => ({
								src: image.image,
								alt: data.name,
							}))}
						/>
					</div>
				</Col>

				<Col flex="auto">
					<div className="product-detail__right-col">
						<ProductInfo data={data} onBuyProduct={onBuyProduct} />
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default ProductDetail

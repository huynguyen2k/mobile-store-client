import { Col, Row } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import ProductCart from '../ProductCard'
import './style.scss'
import GridSkeleton from '../GridSkeleton'
import EmptyData from 'components/EmptyData'

ProductList.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	limitProduct: PropTypes.number,
	limitSkeleton: PropTypes.number,
}

ProductList.defaultProps = {
	loading: false,
	data: [],
	limitProduct: 40,
	limitSkeleton: 20,
}

function ProductList({ loading, data, limitProduct, limitSkeleton }) {
	return (
		<div className="product-list">
			{loading ? (
				<GridSkeleton limit={limitSkeleton} gutter={[0, 0]} />
			) : (
				<>
					{data.length === 0 && <EmptyData title="Hiện chưa có sản phẩm" />}

					<Row className="product-list__content">
						{data.slice(0, limitProduct).map(product => (
							<Col key={product.id} span={6}>
								<ProductCart data={product} />
							</Col>
						))}
					</Row>
				</>
			)}
		</div>
	)
}

export default ProductList

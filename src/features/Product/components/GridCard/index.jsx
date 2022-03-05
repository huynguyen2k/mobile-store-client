import { Col, Row } from 'antd'
import Container from 'components/Container'
import React from 'react'
import PropTypes from 'prop-types'
import ProductCart from '../ProductCard'
import './style.scss'
import GridSkeleton from '../GridSkeleton'

GridCard.propTypes = {
	loading: PropTypes.bool,
	title: PropTypes.string,
	data: PropTypes.array,
	limit: PropTypes.number,
}

GridCard.defaultProps = {
	loading: false,
	title: '',
	data: [],
	limit: 8,
}

function GridCard({ loading, title, data, limit }) {
	return (
		<div className="grid-card">
			<Container>
				<h3 className="grid-card__title">{title}</h3>

				{loading ? (
					<GridSkeleton limit={limit} />
				) : (
					<Row className="grid-card__row" gutter={[20, 20]}>
						{data.slice(0, limit).map(product => (
							<Col key={product.id} span={6}>
								<ProductCart data={product} />
							</Col>
						))}
					</Row>
				)}
			</Container>
		</div>
	)
}

export default GridCard

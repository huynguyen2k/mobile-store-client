import { Col, Row, Skeleton } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

GridSkeleton.propTypes = {
	limit: PropTypes.number,
	gutter: PropTypes.array,
}

GridSkeleton.defaultProps = {
	limit: 8,
	gutter: [20, 20],
}

function GridSkeleton({ limit, gutter }) {
	return (
		<div className="grid-skeleton">
			<Row gutter={gutter}>
				{[...Array(limit).keys()].map(value => (
					<Col key={value} span="6">
						<div className="skeleton-card">
							<Skeleton.Image className="skeleton-card__image" />
							<Skeleton
								active
								title={{ width: '100%' }}
								paragraph={{ rows: 2 }}
							/>
						</div>
					</Col>
				))}
			</Row>
		</div>
	)
}

export default GridSkeleton

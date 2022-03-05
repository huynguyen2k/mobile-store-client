import { Col, Row, Skeleton } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

GridSkeleton.propTypes = {
	limit: PropTypes.number,
}

GridSkeleton.defaultProps = {
	limit: 8,
}

function GridSkeleton({ limit }) {
	return (
		<div className="grid-skeleton">
			<Row gutter={[20, 20]}>
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

import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

EmptyData.propTypes = {
	title: PropTypes.string,
}

EmptyData.defaultProps = {
	title: 'Không có dữ liệu!',
}

function EmptyData({ title }) {
	return (
		<div className="empty-data">
			<div className="empty-data__image">
				<img src="/assets/images/no-data.jpg" alt="no data" />
			</div>

			<h3 className="empty-data__title">{title}</h3>
		</div>
	)
}

export default EmptyData

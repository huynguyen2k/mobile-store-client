import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

StatisticItem.propTypes = {
	type: PropTypes.string,
	icon: PropTypes.node,
	title: PropTypes.string,
	content: PropTypes.string,
}

StatisticItem.defaultProps = {
	type: '',
	icon: null,
	title: '',
	content: '',
}

function StatisticItem({ type, icon, title, content }) {
	return (
		<div className={`statistic-item ${type}`}>
			<div className="statistic-item__icon">{icon}</div>
			<div className="statistic-item__content">
				<h3 className="title">{title}</h3>
				<div className="value">{content}</div>
			</div>
		</div>
	)
}

export default StatisticItem

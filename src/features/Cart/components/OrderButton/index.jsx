import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { LoadingOutlined } from '@ant-design/icons'

OrderButton.propTypes = {
	loading: PropTypes.bool,
	text: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
}

OrderButton.defaultProps = {
	loading: false,
	text: 'ĐẶT MUA',
	onClick: null,
	disabled: false,
}

function OrderButton({ loading, text, onClick, disabled }) {
	const handleClick = () => {
		if (onClick) {
			onClick()
		}
	}

	return (
		<button
			onClick={handleClick}
			className={`order-btn ${disabled || loading ? 'disabled' : ''}`}
		>
			{loading ? <LoadingOutlined /> : text}
		</button>
	)
}

export default OrderButton

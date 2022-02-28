import { MinusOutlined, PlusOutlined } from '@ant-design/icons/lib/icons'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { useMemo } from 'react'

Quantity.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	value: PropTypes.number,
	onChange: PropTypes.func,
}

Quantity.defaultProps = {
	min: 1,
	max: Number.MAX_SAFE_INTEGER,
	value: 1,
	onChange: null,
}

function Quantity({ min, max, value, onChange }) {
	const quantity = useMemo(() => {
		if (value < min) return min
		if (value > max) return max
		return value
	}, [value, min, max])

	const handleChangeQuantity = value => {
		if (typeof onChange !== 'function') return

		let newQuantity = quantity + value
		if (newQuantity < min) {
			newQuantity = min
		}
		if (newQuantity > max) {
			newQuantity = max
		}
		onChange(newQuantity)
	}

	return (
		<div className="quantity">
			<span
				className={`btn minus-btn ${quantity <= min ? 'disabled' : ''}`}
				onClick={() => handleChangeQuantity(-1)}
			>
				<MinusOutlined />
			</span>
			<span className="value">{quantity}</span>
			<span
				className={`btn plus-btn ${quantity >= max ? 'disabled' : ''}`}
				onClick={() => handleChangeQuantity(1)}
			>
				<PlusOutlined />
			</span>
		</div>
	)
}

export default Quantity

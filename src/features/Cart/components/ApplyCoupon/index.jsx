import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

ApplyCoupon.propTypes = {
	onSubmit: PropTypes.func,
}

ApplyCoupon.defaultProps = {
	onSubmit: null,
}

function ApplyCoupon({ onSubmit }) {
	const [code, setCode] = useState('')

	const handleChange = e => {
		setCode(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (code.length === 0) return

		if (onSubmit) {
			onSubmit(code)
		}
	}

	return (
		<div className="apply-coupon">
			<span className="apply-coupon__title">Mã khuyến mãi</span>

			<form className="apply-coupon__form" onSubmit={handleSubmit}>
				<input
					className="input"
					type="text"
					value={code}
					onChange={handleChange}
				/>

				<button
					className={`apply-btn ${code.length > 0 ? 'active' : ''}`}
					type="submit"
				>
					Áp dụng
				</button>
			</form>
		</div>
	)
}

export default ApplyCoupon

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

function parseLocaleNumber(stringNumber, locale) {
	let thousandSeparator = Intl.NumberFormat(locale)
		.format(11111)
		.replace(/\p{Number}/gu, '')
	let decimalSeparator = Intl.NumberFormat(locale)
		.format(1.1)
		.replace(/\p{Number}/gu, '')

	return parseFloat(
		stringNumber
			.replace(new RegExp('\\' + thousandSeparator, 'g'), '')
			.replace(new RegExp('\\' + decimalSeparator), '.')
	)
}

FilterPrice.propTypes = {
	onSubmit: PropTypes.func,
}

FilterPrice.defaultProps = {
	onSubmit: null,
}

function FilterPrice({ onSubmit }) {
	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(0)

	const handleMinPriceChange = e => {
		const value = parseLocaleNumber(e.target.value, 'de-DE')
		setMinPrice(value)

		if (Number.isNaN(value)) {
			setMinPrice(0)
		}
	}

	const handleMaxPriceChange = e => {
		const value = parseLocaleNumber(e.target.value, 'de-DE')
		setMaxPrice(value)

		if (Number.isNaN(value)) {
			setMaxPrice(0)
		}
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (onSubmit) {
			onSubmit({
				minPrice,
				maxPrice,
			})
			setMinPrice(0)
			setMaxPrice(0)
		}
	}

	return (
		<div className="filter-price">
			<form className="filter-price__form" onSubmit={handleSubmit}>
				<div className="filter-price__form-row">
					<input
						className="filter-price__form-input"
						type="text"
						placeholder="Giá min"
						onChange={handleMinPriceChange}
						value={new Intl.NumberFormat('de-DE').format(minPrice)}
					/>
					<div className="line-break"></div>
					<input
						className="filter-price__form-input"
						type="text"
						placeholder="Giá max"
						onChange={handleMaxPriceChange}
						value={new Intl.NumberFormat('de-DE').format(maxPrice)}
					/>
				</div>

				<div className="filter-price__form-row">
					<button className="filter-price__apply-btn">Áp dụng</button>
				</div>
			</form>
		</div>
	)
}

export default FilterPrice

import React from 'react'
import PropTypes from 'prop-types'
import formatNumber from 'utils/formatNumber'
import './style.scss'

FilterPriceList.propTypes = {
	data: PropTypes.array,
	onClick: PropTypes.func,
}

FilterPriceList.defaultProps = {
	data: [],
	onClick: null,
}

function FilterPriceList({ data, onClick }) {
	const handleClick = data => {
		if (onClick) {
			onClick(data)
		}
	}

	return (
		<div className="filter-price-list">
			{data.map((x, index) => {
				let content = null

				if (x.hasOwnProperty('minPrice') && x.hasOwnProperty('maxPrice')) {
					content = `Từ ${formatNumber(x.minPrice)} đến ${formatNumber(
						x.maxPrice
					)}`
				}

				if (x.hasOwnProperty('minPrice') && !x.hasOwnProperty('maxPrice')) {
					content = `Trên ${formatNumber(x.minPrice)}`
				}

				if (!x.hasOwnProperty('minPrice') && x.hasOwnProperty('maxPrice')) {
					content = `Dưới ${formatNumber(x.maxPrice)}`
				}

				return (
					<span
						key={index}
						onClick={() => handleClick(x)}
						className="filter-price-list__item"
					>
						{content}
					</span>
				)
			})}
		</div>
	)
}

export default FilterPriceList

import { Checkbox, Rate } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import FilterPrice from '../FilterPrice'

ProductFilter.propTypes = {
	filter: PropTypes.object,
	onFilterChange: PropTypes.func,
	brandOption: PropTypes.array,
	ratingOption: PropTypes.array,
}

ProductFilter.defaultProps = {
	filter: {},
	onFilterChange: null,
	brandOption: [],
	ratingOption: [],
}

function ProductFilter(props) {
	const { filter, onFilterChange, brandOption, ratingOption } = props

	const handleBrandChange = value => {
		if (onFilterChange) {
			const newFilter = {
				...filter,
				brand: value,
			}

			if (newFilter.brand.length === 0) {
				delete newFilter.brand
			}

			onFilterChange(newFilter)
		}
	}

	const handleRatingChange = value => {
		if (onFilterChange) {
			const newFilter = {
				...filter,
				rating: value,
			}
			onFilterChange(newFilter)
		}
	}

	const handlePriceChange = ({ minPrice, maxPrice }) => {
		if (onFilterChange) {
			const newFilter = {
				...filter,
				min_price: minPrice,
				max_price: maxPrice,
			}
			onFilterChange(newFilter)
		}
	}

	return (
		<div className="product-filter">
			<div className="product-filter__item">
				<h3 className="product-filter__title">THƯƠNG HIỆU</h3>
				<div className="product-filter__content">
					<Checkbox.Group
						options={brandOption}
						value={filter.brand}
						onChange={handleBrandChange}
					/>
				</div>
			</div>

			<div className="product-filter__item">
				<h3 className="product-filter__title">ĐÁNH GIÁ</h3>
				<div className="product-filter__content">
					{ratingOption.map((x, index) => (
						<div
							key={index}
							className="product-filter__rating"
							onClick={() => handleRatingChange(x)}
						>
							<Rate disabled value={x} style={{ fontSize: '1rem' }} />
							<span className="text">từ {x} sao</span>
						</div>
					))}
				</div>
			</div>

			<div className="product-filter__item">
				<h3 className="product-filter__title">GIÁ</h3>
				<div className="product-filter__content">
					<FilterPrice onSubmit={handlePriceChange} />
				</div>
			</div>
		</div>
	)
}

export default ProductFilter

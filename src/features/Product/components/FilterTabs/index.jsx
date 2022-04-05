import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './style.scss'

FilterTabs.propTypes = {
	filter: PropTypes.object,
}

FilterTabs.defaultProps = {
	filter: null,
}

const sortList = [
	{ id: 1, link: '/product?sort=default', title: 'Nổi Bậc' },
	{ id: 2, link: '/product?sort=top-seller', title: 'Bán Chạy' },
	{ id: 3, link: '/product?sort=newest', title: 'Hàng Mới' },
	{ id: 4, link: '/product?sort=price-asc', title: 'Giá Thấp Đến Cao' },
	{ id: 5, link: '/product?sort=price-desc', title: 'Giá Cao Đến Thấp' },
]

function FilterTabs({ filter }) {
	if (!filter) return null
	return (
		<div className="filter-tabs">
			{sortList.map(x => (
				<Link
					key={x.id}
					className={
						filter.sort === x.link.slice(x.link.indexOf('=') + 1)
							? 'filter-tabs__link active'
							: 'filter-tabs__link'
					}
					to={x.link}
				>
					{x.title}
				</Link>
			))}
		</div>
	)
}

export default FilterTabs

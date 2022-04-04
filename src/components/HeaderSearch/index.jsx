import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

HeaderSearch.propTypes = {
	onClick: PropTypes.func,
}

HeaderSearch.defaultProps = {
	onClick: null,
}

function HeaderSearch({ onClick }) {
	const handleClick = () => {
		if (onClick) {
			onClick()
		}
	}

	return (
		<div className="header-search" onClick={handleClick}>
			<SearchOutlined className="header-search__icon" />
			<span className="header-search__text">Tìm kiếm</span>
		</div>
	)
}

export default HeaderSearch

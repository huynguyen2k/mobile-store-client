import { SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

SearchBox.propTypes = {
	onSubmit: PropTypes.func,
}

SearchBox.defaultProps = {
	onSubmit: null,
}

function SearchBox({ onSubmit }) {
	const inputRef = useRef(null)

	const handleSubmit = e => {
		e.preventDefault()
		if (onSubmit) {
			onSubmit(inputRef.current.value)
		}
	}

	return (
		<div className="search-box">
			<form className="search-box__form" onSubmit={handleSubmit}>
				<input className="search-input" ref={inputRef} />
				<button type="submit" className="submit-btn">
					<SearchOutlined />
				</button>
			</form>
		</div>
	)
}

export default SearchBox

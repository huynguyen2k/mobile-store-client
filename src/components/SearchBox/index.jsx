import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { AutoComplete } from 'antd'

SearchBox.propTypes = {
	onSubmit: PropTypes.func,
	optionList: PropTypes.array,
}

SearchBox.defaultProps = {
	onSubmit: null,
	optionList: [],
}

function SearchBox({ onSubmit, optionList }) {
	const inputRef = useRef(null)

	const [value, setValue] = useState('')
	const [options, setOptions] = useState(optionList)

	useEffect(() => {
		setOptions(optionList)
	}, [optionList])

	const handleSubmit = e => {
		e.preventDefault()
		if (onSubmit) {
			onSubmit(inputRef.current.value)
		}
	}

	const onSelect = data => {
		if (onSubmit) {
			onSubmit(data)
		}
	}

	const onChange = data => {
		setValue(data)
	}

	const onSearch = searchText => {
		setOptions(
			optionList.filter(x =>
				x.value
					.toLowerCase()
					.normalize()
					.includes(searchText.toLowerCase().normalize())
			)
		)
	}

	return (
		<div className="search-box">
			<form className="search-box__form" onSubmit={handleSubmit}>
				<AutoComplete
					backfill
					style={{ flex: 'auto' }}
					options={options}
					value={value}
					onChange={onChange}
					onSearch={onSearch}
					onSelect={onSelect}
				>
					<input
						ref={inputRef}
						type="text"
						className="search-input"
						placeholder="Nhập tên sản phẩm mà bạn muốn tìm"
					/>
				</AutoComplete>

				<button type="submit" className="submit-btn">
					<SearchOutlined />
				</button>
			</form>
		</div>
	)
}

export default SearchBox

import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import DOMPurify from 'dompurify'
import { useState } from 'react'

ProductDescription.propTypes = {
	data: PropTypes.object,
}

ProductDescription.defaultProps = {
	data: null,
}

function ProductDescription({ data }) {
	const [showAll, setShowAll] = useState(false)

	if (!data) return null
	return (
		<div className={`product-description${showAll ? ' show-all' : ''}`}>
			<h3 className="product-description__title">Mô tả sản phẩm</h3>
			<div
				className="product-description__content"
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(data.description),
				}}
			/>
			<span
				className="show-all-btn"
				onClick={() => setShowAll(value => !value)}
			>
				{showAll ? 'Thu Gọn Nội Dung' : 'Xem Thêm Nội Dung'}
			</span>
		</div>
	)
}

export default ProductDescription

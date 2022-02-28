import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import DOMPurify from 'dompurify'

ProductSpecification.propTypes = {
	data: PropTypes.object,
}

ProductSpecification.defaultProps = {
	data: null,
}

function ProductSpecification({ data }) {
	if (!data) return null
	return (
		<div className="product-specification">
			<h3 className="product-specification__title">Thông số kỹ thuật</h3>
			<div
				className="product-specification__content"
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(data.specifications),
				}}
			/>
		</div>
	)
}

export default ProductSpecification

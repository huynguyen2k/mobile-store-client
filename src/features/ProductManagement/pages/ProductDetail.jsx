import React from 'react'
import ProductDetail from 'components/ProductDetail'
import { useParams } from 'react-router-dom'
import useProductDetail from 'hooks/useProductDetail'
import ProductSpecification from 'components/ProductSpecification'
import ProductDescription from 'components/ProductDescription'

function ProductDetailPage() {
	const { productId } = useParams()
	const { data } = useProductDetail(productId)

	return (
		<>
			<ProductDetail data={data} />
			<ProductSpecification data={data} />
			<ProductDescription data={data} />
		</>
	)
}

export default ProductDetailPage

import productApi from 'api/productApi'
import Container from 'components/Container'
import ProductDescription from 'components/ProductDescription'
import ProductDetail from 'components/ProductDetail'
import ProductSpecification from 'components/ProductSpecification'
import useFetchData from 'hooks/useFetchData'
import useProductDetail from 'hooks/useProductDetail'
import React from 'react'
import { useParams } from 'react-router-dom'
import GridSlider from '../components/GridSlider'

function ProductDetailPage() {
	const { productId } = useParams()
	const { data } = useProductDetail(productId)
	const { data: productList } = useFetchData(productApi.getAll)

	return (
		<div style={{ padding: '16px 0' }}>
			<Container>
				<ProductDetail data={data} />
				<GridSlider limit={10} title="Sản phẩm tương tự" data={productList} />
				<GridSlider limit={6} title="Sản phẩm khác" data={productList} />
				<ProductSpecification data={data} />
				<ProductDescription data={data} />
			</Container>
		</div>
	)
}

export default ProductDetailPage

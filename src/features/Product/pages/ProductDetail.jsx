import productApi from 'api/productApi'
import Container from 'components/Container'
import ProductDescription from 'components/ProductDescription'
import ProductDetail from 'components/ProductDetail'
import ProductSpecification from 'components/ProductSpecification'
import useFetchData from 'hooks/useFetchData'
import useProductDetail from 'hooks/useProductDetail'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import GridSlider from '../components/GridSlider'
import moment from 'moment'
import { addCartItem } from 'features/Cart/cartSlice'
import { notification } from 'antd'

function ProductDetailPage() {
	const location = useLocation()
	const navigate = useNavigate()
	const { productId } = useParams()

	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)

	const { data } = useProductDetail(productId)
	const { data: productList } = useFetchData(productApi.getAll)

	const handleBuyProduct = async data => {
		if (!user) {
			navigate('/login', { state: { from: location } })
			return
		}

		const newData = {
			...data,
			user_id: user.id,
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
		}

		try {
			const response = await dispatch(addCartItem(newData)).unwrap()
			notification.success({
				message: response.message,
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div style={{ padding: '16px 0' }}>
			<Container>
				<ProductDetail data={data} onBuyProduct={handleBuyProduct} />
				<GridSlider limit={10} title="Sản phẩm tương tự" data={productList} />
				<GridSlider limit={10} title="Sản phẩm khác" data={productList} />
				<ProductSpecification data={data} />
				<ProductDescription data={data} />
			</Container>
		</div>
	)
}

export default ProductDetailPage

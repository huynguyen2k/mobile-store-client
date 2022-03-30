import productApi from 'api/productApi'
import Container from 'components/Container'
import ProductDescription from 'components/ProductDescription'
import ProductDetail from 'components/ProductDetail'
import ProductSpecification from 'components/ProductSpecification'
import useFetchData from 'hooks/useFetchData'
import useProductDetail from 'hooks/useProductDetail'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import GridSlider from '../components/GridSlider'
import moment from 'moment'
import { addCartItem } from 'features/Cart/cartSlice'
import { notification } from 'antd'
import ratingApi from 'api/ratingApi'
import RatingList from '../components/RatingList'

function ProductDetailPage() {
	const location = useLocation()
	const navigate = useNavigate()
	const { productId } = useParams()

	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const cartItems = useSelector(state => state.cart.cartItems)

	const { data } = useProductDetail(productId)
	const { data: productList } = useFetchData(productApi.getAll)

	const getRatingList = useCallback(
		() => ratingApi.getAll({ productId: productId }),
		[productId]
	)
	const { data: ratingList } = useFetchData(getRatingList)

	const handleBuyProduct = async (option, quantity) => {
		if (!user) {
			navigate('/login', { state: { from: location } })
			return
		}

		const availableQuantity = option.quantity - option.sold_quantity
		if (availableQuantity === 0) {
			return notification.info({
				message: 'Xin lỗi sản phẩm này hiện đã hết hàng!',
			})
		}

		let quantityInCart = 0
		const index = cartItems.findIndex(e => e.product_option_id === option.id)

		if (index >= 0) {
			quantityInCart = cartItems[index].quantity
		}
		const totalQuantity = quantity + quantityInCart

		if (totalQuantity > 5) {
			return notification.info({
				message: `Xin lỗi số lượng tối đa có thể mua của sản phẩm này là 5!`,
			})
		}

		if (totalQuantity > availableQuantity) {
			return notification.info({
				message: `Xin lỗi hiện chỉ còn ${availableQuantity} sản phẩm!`,
			})
		}

		const data = {
			product_option_id: option.id,
			quantity: quantity,
			user_id: user.id,
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
		}

		try {
			const response = await dispatch(addCartItem(data)).unwrap()
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
				<RatingList data={ratingList} />
			</Container>
		</div>
	)
}

export default ProductDetailPage

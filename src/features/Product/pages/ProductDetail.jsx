import productApi from 'api/productApi'
import Container from 'components/Container'
import ProductDescription from 'components/ProductDescription'
import ProductDetail from 'components/ProductDetail'
import ProductSpecification from 'components/ProductSpecification'
import useFetchData from 'hooks/useFetchData'
import useProductDetail from 'hooks/useProductDetail'
import React, { useCallback, useEffect } from 'react'
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

	const getRelativeProductList = useCallback(() => {
		return productApi.getAll({ published: 1, brand: data?.brand_id })
	}, [data])

	const { data: relativeProductList, refetchData: refetchRelativeProduct } =
		useFetchData(getRelativeProductList)

	useEffect(() => {
		refetchRelativeProduct()
	}, [data, refetchRelativeProduct])

	const getOtherProductList = useCallback(() => {
		return productApi.getAll({ published: 1 })
	}, [])
	const otherProduct = useFetchData(getOtherProductList)

	const getRatingList = useCallback(() => {
		return ratingApi.getAll({ productId: productId })
	}, [productId])

	const { data: ratingList, refetchData: refetchRatingList } =
		useFetchData(getRatingList)

	useEffect(() => {
		refetchRatingList()
	}, [getRatingList, refetchRatingList])

	const handleBuyProduct = async (option, quantity) => {
		if (!user) {
			navigate('/login', { state: { from: location } })
			return
		}

		const availableQuantity = option.quantity - option.sold_quantity
		if (availableQuantity === 0) {
			return notification.info({
				message: 'Xin l????i sa??n ph????m na??y hi????n ??a?? h????t ha??ng!',
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
				message: `Xin l????i s???? l??????ng t????i ??a co?? th???? mua cu??a sa??n ph????m na??y la?? 5!`,
			})
		}

		if (totalQuantity > availableQuantity) {
			return notification.info({
				message: `Xin l????i hi????n chi?? co??n ${availableQuantity} sa??n ph????m!`,
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

				<GridSlider
					limit={100}
					title="Sa??n ph????m t????ng t????"
					data={relativeProductList}
				/>

				<GridSlider
					limit={100}
					title="Sa??n ph????m kha??c"
					data={otherProduct.data}
				/>

				<ProductSpecification data={data} />

				<ProductDescription data={data} />

				<RatingList data={ratingList} />
			</Container>
		</div>
	)
}

export default ProductDetailPage

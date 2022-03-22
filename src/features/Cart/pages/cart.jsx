import { Col, notification, Row } from 'antd'
import ghnApi from 'api/ghnApi'
import { getAddressList } from 'features/CustomerAccount/customerSlice'
import { getShopInfo } from 'features/ShopManagement/shopSlice'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartItem } from '../cartSlice'
import ApplyCoupon from '../components/ApplyCoupon'
import CartList from '../components/CartList'
import DeliveryAddress from '../components/DeliveryAddress'
import Order from '../components/Order'

function CartPage() {
	const dispatch = useDispatch()

	const [deliveryCost, setDeliveryCost] = useState(0)
	const [selectedItems, setSelectedItems] = useState([])

	const user = useSelector(state => state.auth.user)
	const shopInfo = useSelector(state => state.shop.data)
	const cartItems = useSelector(state => state.cart.cartItems)
	const addressList = useSelector(state => state.customer.addressList)

	const customerAddress = useMemo(() => {
		const index = addressList.findIndex(e => e.is_default === 1)
		if (index >= 0) {
			return { ...addressList[index] }
		}
		return null
	}, [addressList])

	const order = useMemo(() => {
		const totalProduct = selectedItems.reduce((result, id) => {
			const index = cartItems.findIndex(e => e.id === id)
			if (index >= 0) {
				return result + cartItems[index].quantity
			}
			return result
		}, 0)

		const totalPrice = selectedItems.reduce((result, id) => {
			const index = cartItems.findIndex(e => e.id === id)
			if (index >= 0) {
				const item = cartItems[index]
				return result + item.quantity * item.sale_price
			}
			return result
		}, 0)

		const discount = 0

		return {
			total_product: totalProduct,
			total_price: totalPrice,
			delivery_cost: deliveryCost,
			discount: discount,
			final_price: totalPrice + deliveryCost - discount,
		}
	}, [cartItems, selectedItems, deliveryCost])

	useEffect(() => {
		if (!user) return
		;(async () => {
			try {
				await dispatch(getAddressList(user.id)).unwrap()
			} catch (error) {
				console.log(error)
			}
		})()
	}, [dispatch, user])

	useEffect(() => {
		;(async () => {
			try {
				await dispatch(getShopInfo()).unwrap()
			} catch (error) {
				console.log(error)
			}
		})()
	}, [dispatch])

	useEffect(() => {
		if (!shopInfo || !customerAddress) return
		;(async () => {
			try {
				const service = await ghnApi.getService({
					shop_id: Number(process.env.REACT_APP_GHN_SHOP_ID),
					from_district: shopInfo.district_id,
					to_district: customerAddress.district_id,
				})

				if (service.data.length === 0) return

				const serviceId = service.data[0].service_id
				const productSize = {
					width: 0,
					height: 0,
					weight: 0,
					length: 0,
				}

				selectedItems.forEach(id => {
					const index = cartItems.findIndex(e => e.id === id)
					if (index >= 0) {
						productSize.width +=
							cartItems[index].width * cartItems[index].quantity
						productSize.height +=
							cartItems[index].height * cartItems[index].quantity
						productSize.weight +=
							cartItems[index].weight * cartItems[index].quantity
						productSize.length +=
							cartItems[index].length * cartItems[index].quantity
					}
				})

				const data = {
					service_id: serviceId,
					service_type_id: null,
					from_district_id: shopInfo.district_id,
					to_district_id: customerAddress.district_id,
					to_ward_code: customerAddress.ward_code,
					insurance_value: 10000,
					coupon: null,
					...productSize,
				}

				const response = await ghnApi.getFee(data)
				setDeliveryCost(response.data.total)
			} catch (error) {
				setDeliveryCost(0)
			}
		})()
	}, [shopInfo, customerAddress, cartItems, selectedItems])

	const handleSelect = (checked, data) => {
		if (checked) {
			const quantity = data.quantity
			const availableQuantity = data.total_quantity - data.sold_quantity

			if (availableQuantity === 0) {
				return notification.info({
					message: 'Xin lỗi sản phẩm này hiện đã hết hàng!',
				})
			}

			if (quantity > availableQuantity) {
				return notification.info({
					message: `Xin lỗi hiện sản phẩm này chỉ còn lại ${availableQuantity} sản phẩm!`,
				})
			}

			return setSelectedItems([...selectedItems, data.id])
		}

		const newSelectedItems = selectedItems.filter(id => id !== data.id)
		setSelectedItems(newSelectedItems)
	}

	const handleSelectAll = checked => {
		if (checked) {
			const newSelectedItems = cartItems
				.filter(e => {
					const quantity = e.quantity
					const availableQuantity = e.total_quantity - e.sold_quantity

					return availableQuantity > 0 && quantity <= availableQuantity
				})
				.map(e => e.id)
			return setSelectedItems(newSelectedItems)
		}

		setSelectedItems([])
	}

	const handleDelete = async id => {
		try {
			const response = await dispatch(
				deleteCartItem({
					id: id,
					userId: user.id,
				})
			).unwrap()

			handleSelect(false, { id })
			notification.success({
				message: response.message,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteSelectedItems = async () => {
		if (selectedItems.length === 0) {
			return notification.info({
				message: 'Vui lòng chọn sản phẩm để xóa!',
			})
		}

		try {
			await Promise.all(
				selectedItems.map(async id => {
					return await dispatch(
						deleteCartItem({
							id: id,
							userId: user.id,
						})
					).unwrap()
				})
			)

			setSelectedItems([])
			notification.success({
				message: 'Xóa các sản phẩm đã chọn thành công!',
			})
		} catch (error) {
			console.log(error)
		}
	}

	const handleUpdateQuantity = async data => {
		if (!user || !data) return

		try {
			await dispatch(
				updateCartItem({
					userId: user.id,
					data: {
						id: data.id,
						quantity: data.quantity,
					},
				})
			).unwrap()
		} catch (error) {
			console.log(error)
		}
	}

	const handleApplyCoupon = code => {
		console.log(code)
	}

	return (
		<div style={{ padding: '48px 0' }}>
			<Row gutter={16}>
				<Col span="17">
					<CartList
						data={cartItems}
						selectedItems={selectedItems}
						onSelect={handleSelect}
						onSelectAll={handleSelectAll}
						onUpdateQuantity={handleUpdateQuantity}
						onDelete={handleDelete}
						onDeleteSelectedItems={handleDeleteSelectedItems}
					/>
				</Col>

				<Col span="7">
					<div style={{ marginTop: 36 }}>
						<DeliveryAddress data={customerAddress} />
					</div>

					<div style={{ marginTop: 16 }}>
						<ApplyCoupon onSubmit={handleApplyCoupon} />
					</div>

					<div style={{ marginTop: 16 }}>
						<Order data={order} />
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default CartPage

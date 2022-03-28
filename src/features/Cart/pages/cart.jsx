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
import moment from 'moment'
import couponsApi from 'api/couponsApi'
import OrderButton from '../components/OrderButton'
import orderStatus from 'constants/orderStatus'
import sleep from 'utils/sleep'
import orderApi from 'api/orderApi'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function CartPage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [orderBtnLoading, setOrderBtnLoading] = useState(false)
	const [coupon, setCoupon] = useState(null)
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

		let discountValue = 0
		if (coupon) {
			discountValue = coupon.discount_value
		}

		return {
			total_product: totalProduct,
			total_price: totalPrice,
			delivery_cost: deliveryCost,
			coupons_id: coupon ? coupon.id : null,
			discount: discountValue,
			final_price: totalPrice + deliveryCost - discountValue,
		}
	}, [cartItems, selectedItems, deliveryCost, coupon])

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

				if (service.data.length === 0 || selectedItems.length === 0) {
					return setDeliveryCost(0)
				}

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

	const handleApplyCoupon = async code => {
		try {
			const response = await couponsApi.apply({
				code,
				current_date: moment().format('YYYY-MM-DD HH:mm:ss'),
			})
			notification.success({
				message: 'Áp dụng mã giảm giá thành công!',
			})
			setCoupon(response.content)
		} catch (error) {
			notification.error({
				message: error.message,
			})
			setCoupon(null)
		}
	}

	const handleOrderItem = async () => {
		if (!customerAddress) {
			return notification.info({
				message: 'Vui lòng chọn địa chỉ giao hàng trước khi đặt mua!',
			})
		}

		const data = {
			order: {
				total_price: order.final_price,
				delivery_cost: order.delivery_cost,
				coupons_id: order.coupons_id,
				discount_value: order.discount,
				status_id: orderStatus.waiting.id,
				shop_name: shopInfo.name,
				shop_phone: shopInfo.phone_number,
				shop_address: shopInfo.full_address,
				customer_id: user.id,
				customer_name: customerAddress.full_name,
				customer_phone: customerAddress.phone_number,
				customer_address: customerAddress.full_address,
				created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
			},

			orderDetail: selectedItems.map(id => {
				const index = cartItems.findIndex(e => e.id === id)
				if (index >= 0) {
					return {
						price: cartItems[index].sale_price,
						quantity: cartItems[index].quantity,
						product_option_id: cartItems[index].product_option_id,
					}
				}
				return null
			}),
		}

		try {
			setOrderBtnLoading(true)
			await sleep(1000)
			const response = await orderApi.add(data)

			await handleDeleteSelectedItems()
			setCoupon(null)

			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})

			navigate(`/customer/order/${response.orderId}`)
		} catch (error) {
			console.log(error)
			setOrderBtnLoading(false)
		}
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

					<div style={{ marginTop: 16 }}>
						<OrderButton
							loading={orderBtnLoading}
							onClick={handleOrderItem}
							disabled={!selectedItems.length}
						/>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default CartPage

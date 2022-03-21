import { Col, notification, Row } from 'antd'
import { getAddressList } from 'features/CustomerAccount/customerSlice'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartItem } from '../cartSlice'
import CartList from '../components/CartList'
import DeliveryAddress from '../components/DeliveryAddress'
import Order from '../components/Order'

function CartPage() {
	const dispatch = useDispatch()

	const user = useSelector(state => state.auth.user)
	const cartItems = useSelector(state => state.cart.cartItems)
	const addressList = useSelector(state => state.customer.addressList)

	const [selectedItems, setSelectedItems] = useState([])

	const deliveryAddress = useMemo(() => {
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

		const deliveryCost = 0
		const discount = 0

		return {
			total_product: totalProduct,
			total_price: totalPrice,
			delivery_cost: deliveryCost,
			discount: discount,
			final_price: totalPrice + deliveryCost - discount,
		}
	}, [cartItems, selectedItems])

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
						<DeliveryAddress data={deliveryAddress} />
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

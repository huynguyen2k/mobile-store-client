import { notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartItem } from '../cartSlice'
import CartList from '../components/CartList'

function CartPage() {
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const cartItems = useSelector(state => state.cart.cartItems)
	const [selectedItems, setSelectedItems] = useState([])

	const handleSelect = (checked, data) => {
		if (checked) {
			return setSelectedItems([...selectedItems, data.id])
		}

		const newSelectedItems = selectedItems.filter(id => id !== data.id)
		setSelectedItems(newSelectedItems)
	}

	const handleSelectAll = checked => {
		if (checked) {
			const newSelectedItems = cartItems.map(e => e.id)
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

		const maxQuantity = 5
		if (data.quantity > maxQuantity) {
			return notification.info({
				message: `Số lượng được mua tối đa của sản phẩm này là ${maxQuantity}`,
			})
		}

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
			<CartList
				data={cartItems}
				selectedItems={selectedItems}
				onSelect={handleSelect}
				onSelectAll={handleSelectAll}
				onUpdateQuantity={handleUpdateQuantity}
				onDelete={handleDelete}
				onDeleteSelectedItems={handleDeleteSelectedItems}
			/>
		</div>
	)
}

export default CartPage

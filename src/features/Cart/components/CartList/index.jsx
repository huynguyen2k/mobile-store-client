import { Button, Checkbox } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import CartItem from '../CartItem'
import './style.scss'
import { DeleteOutlined } from '@ant-design/icons'
import EmptyData from 'components/EmptyData'

CartList.propTypes = {
	data: PropTypes.array,
	selectedItems: PropTypes.array,

	onSelect: PropTypes.func,
	onSelectAll: PropTypes.func,
	onUpdateQuantity: PropTypes.func,
	onDelete: PropTypes.func,
	onDeleteSelectedItems: PropTypes.func,
}

CartList.defaultProps = {
	data: [],
	selectedItems: [],

	onSelect: null,
	onSelectAll: null,
	onUpdateQuantity: null,
	onDelete: null,
	onDeleteSelectedItems: null,
}

function CartList(props) {
	const {
		data,
		selectedItems,
		onSelect,
		onSelectAll,
		onUpdateQuantity,
		onDelete,
		onDeleteSelectedItems,
	} = props

	const isCheckedAll = () => {
		if (!Array.isArray(data) || !Array.isArray(selectedItems)) return false

		if (selectedItems.length === 0) return false
		return data.length === selectedItems.length
	}

	const handleSelectAll = e => {
		if (onSelectAll) {
			onSelectAll(e.target.checked)
		}
	}

	const handleDeleteSelectedItems = () => {
		if (onDeleteSelectedItems) {
			onDeleteSelectedItems()
		}
	}

	return (
		<div className="cart-list">
			<h3 className="cart-list__title">Giỏ hàng</h3>

			<div className="cart-list__header">
				<div className="row">
					<div className="col-1">
						<Checkbox checked={isCheckedAll()} onChange={handleSelectAll}>
							Tất cả ({data.length} sản phẩm)
						</Checkbox>
					</div>

					<div className="col-2">
						<span>Đơn giá</span>
					</div>

					<div className="col-3">
						<span>Số lượng</span>
					</div>

					<div className="col-4">
						<span>Thành tiền</span>
					</div>

					<div className="col-5">
						<Button
							type="text"
							icon={<DeleteOutlined />}
							onClick={handleDeleteSelectedItems}
						/>
					</div>
				</div>
			</div>

			<div className="cart-list__content">
				{data.map(e => (
					<CartItem
						key={e.id}
						checked={selectedItems.includes(e.id)}
						data={e}
						onSelect={onSelect}
						onUpdateQuantity={onUpdateQuantity}
						onDelete={onDelete}
					/>
				))}

				{data.length === 0 && (
					<EmptyData title="Chưa có sản phẩm trong giỏ hàng!" />
				)}
			</div>
		</div>
	)
}

export default CartList

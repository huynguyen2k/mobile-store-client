import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Button, Checkbox } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import formatCurrency from 'utils/formatCurrency'
import Quantity from 'components/Quantity'
import { Link } from 'react-router-dom'

CartItem.propTypes = {
	checked: PropTypes.bool,
	data: PropTypes.object,
	onSelect: PropTypes.func,
	onUpdateQuantity: PropTypes.func,
	onDelete: PropTypes.func,
}

CartItem.defaultProps = {
	checked: false,
	data: null,
	onSelect: null,
	onUpdateQuantity: null,
	onDelete: null,
}

function CartItem({ checked, data, onSelect, onUpdateQuantity, onDelete }) {
	const handleSelect = e => {
		if (onSelect) {
			onSelect(e.target.checked, data)
		}
	}

	const handleUpdateQuantity = quantity => {
		if (onUpdateQuantity) {
			onUpdateQuantity({
				...data,
				quantity,
			})
		}
	}

	const handleDelete = id => {
		if (onDelete) {
			onDelete(id)
		}
	}

	if (!data) return null
	return (
		<div className="cart-item">
			<div className="row">
				<div className="col-1">
					<div className="cart-item__product">
						<Checkbox checked={checked} onChange={handleSelect} />
						<Link className="content" to={`/product-detail/${data.product_id}`}>
							<img
								className="product-img"
								src={data.product_image}
								alt={data.product_name}
							/>

							<div className="product-info">
								<h4 className="product-name">{data.product_name}</h4>
								<span className="product-option">
									{`(${data.ram_name}/${data.rom_name}) - Màu ${data.color_name}`}
								</span>
							</div>
						</Link>
					</div>
				</div>

				<div className="col-2">
					<span className="price">{formatCurrency(data.sale_price)}</span>
				</div>

				<div className="col-3">
					<Quantity
						min={1}
						max={5}
						value={data.quantity}
						onChange={handleUpdateQuantity}
					/>
				</div>

				<div className="col-4">
					<span className="total-price">
						{formatCurrency(data.sale_price * data.quantity)}
					</span>
				</div>

				<div className="col-5">
					<Button
						type="text"
						icon={<DeleteOutlined />}
						onClick={() => handleDelete(data.id)}
					/>
				</div>
			</div>
		</div>
	)
}

export default CartItem

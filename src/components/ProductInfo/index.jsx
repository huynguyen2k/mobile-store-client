import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Button, Divider, Rate, Space } from 'antd'
import { useEffect } from 'react'
import getPromotionPercent from 'utils/getPromotionPercent'
import formatCurrency from 'utils/formatCurrency'
import Quantity from 'components/Quantity'

ProductInfo.propTypes = {
	data: PropTypes.object,
	onBuyProduct: PropTypes.func,
}

ProductInfo.defaultProps = {
	data: null,
	onBuyProduct: null,
}

function ProductInfo({ data, onBuyProduct }) {
	const [quantity, setQuantity] = useState(1)
	const [selectedOption, setSelectedOption] = useState(null)

	useEffect(() => {
		if (!data) return

		const optionList = data.product_options
		if (Array.isArray(optionList) && optionList.length > 0) {
			setSelectedOption(optionList[0])
		}
	}, [data])

	const ramOptionList = useMemo(() => {
		if (!data || !Array.isArray(data.product_options)) return []

		return data.product_options
			.filter(
				(option, index, arr) =>
					arr.findIndex(item => item.ram_id === option.ram_id) === index
			)
			.map(({ ram_id, ram_name }) => ({
				ram_id,
				ram_name,
			}))
	}, [data])

	const renderRamOptionList = () => {
		return ramOptionList.map(option => {
			const isSelected = option.ram_id === selectedOption?.ram_id

			return (
				<Button
					key={option.ram_id}
					size="middle"
					ghost={isSelected}
					type={isSelected ? 'primary' : 'default'}
					onClick={() => {
						const newOption = data.product_options.find(
							item => item.ram_id === option.ram_id
						)
						if (newOption) {
							setSelectedOption({ ...newOption })
						}
					}}
				>
					{option.ram_name}
				</Button>
			)
		})
	}

	const romOptionList = useMemo(() => {
		if (
			!data ||
			!Array.isArray(data.product_options) ||
			selectedOption === null
		)
			return []

		return data.product_options
			.filter(option => option.ram_id === selectedOption.ram_id)
			.filter(
				(option, index, arr) =>
					arr.findIndex(item => item.rom_id === option.rom_id) === index
			)
			.map(({ rom_id, rom_name }) => ({
				rom_id,
				rom_name,
			}))
	}, [data, selectedOption])

	const renderRomOptionList = () => {
		return romOptionList.map(option => {
			const isSelected = option.rom_id === selectedOption?.rom_id

			return (
				<Button
					key={option.rom_id}
					size="middle"
					ghost={isSelected}
					type={isSelected ? 'primary' : 'default'}
					onClick={() => {
						const newOption = data.product_options.find(
							item =>
								item.ram_id === selectedOption.ram_id &&
								item.rom_id === option.rom_id
						)
						if (newOption) {
							setSelectedOption({ ...newOption })
						}
					}}
				>
					{option.rom_name}
				</Button>
			)
		})
	}

	const colorOptionList = useMemo(() => {
		if (
			!data ||
			!Array.isArray(data.product_options) ||
			selectedOption === null
		)
			return []

		return data.product_options
			.filter(
				option =>
					option.ram_id === selectedOption.ram_id &&
					option.rom_id === selectedOption.rom_id
			)
			.map(({ color_id, color_name }) => ({
				color_id,
				color_name,
			}))
	}, [data, selectedOption])

	const renderColorOptionList = () => {
		return colorOptionList.map(option => {
			const isSelected = option.color_id === selectedOption?.color_id

			return (
				<Button
					key={option.color_id}
					size="middle"
					ghost={isSelected}
					type={isSelected ? 'primary' : 'default'}
					onClick={() => {
						const newOption = data.product_options.find(
							item =>
								item.ram_id === selectedOption.ram_id &&
								item.rom_id === selectedOption.rom_id &&
								item.color_id === option.color_id
						)
						if (newOption) {
							setSelectedOption({ ...newOption })
						}
					}}
				>
					{option.color_name}
				</Button>
			)
		})
	}

	const getTotalSoldQuantity = () => {
		if (!data || !Array.isArray(data.product_options)) return null
		return data.product_options.reduce(
			(result, option) => result + option.sold_quantity,
			0
		)
	}

	const handleBuyProduct = () => {
		if (!selectedOption) return

		if (onBuyProduct) {
			onBuyProduct(selectedOption, quantity)
		}
	}

	if (!data) return null
	return (
		<div className="product-info">
			<h4 className="product-brand">Thương hiệu: {data.brand_name}</h4>
			<h3 className="product-name">Điện thoại {data.name}</h3>

			<div className="rating-box">
				<Rate disabled allowHalf value={data.rating} />
				<span className="rating-number">({data.rating_quantity} đánh giá)</span>
				<span className="break-line">|</span>
				<span className="sold-quantity">Đã bán {getTotalSoldQuantity()}</span>
			</div>

			<div className="product-price">
				<span className="sale-price">
					{formatCurrency(selectedOption?.sale_price)}
				</span>

				{selectedOption?.original_price > selectedOption?.sale_price && (
					<>
						<span className="original-price">
							{formatCurrency(selectedOption?.original_price)}
						</span>
						<span className="promotion-percent">{`-${getPromotionPercent(
							selectedOption?.original_price,
							selectedOption?.sale_price
						).toFixed(0)}%`}</span>
					</>
				)}
			</div>

			<Divider style={{ margin: '16px 0' }} />

			<div className="product-option">
				<span className="product-option-text">Cấu hình sản phẩm</span>
				<div className="option-list">
					<Space>{renderRamOptionList()}</Space>
				</div>
				<div className="option-list">
					<Space>{renderRomOptionList()}</Space>
				</div>
				<div className="option-list">
					<Space>{renderColorOptionList()}</Space>
				</div>
			</div>

			<Divider style={{ margin: '16px 0' }} />

			<div className="selected-quantity">
				<span className="quantity-text">Số lượng</span>
				<Quantity
					min={1}
					max={5}
					value={quantity}
					onChange={value => setQuantity(value)}
				/>
				<span className="available-product">
					{(() => {
						const availableQuantity =
							selectedOption?.quantity - selectedOption?.sold_quantity
						if (availableQuantity === 0) {
							return 'Hết hàng'
						}
						if (availableQuantity > 0) {
							return `${availableQuantity} sản phẩm có sẵn`
						}
						return ''
					})()}
				</span>
				<div className="buy-btn-wrap">
					<Button
						danger
						size="large"
						type="primary"
						className="buy-btn"
						onClick={handleBuyProduct}
					>
						Chọn mua
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ProductInfo

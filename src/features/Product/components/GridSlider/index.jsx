import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import Slider from 'react-slick/lib/slider'
import ProductCart from '../ProductCard'
import './style.scss'

GridSlider.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array,
	limit: PropTypes.number,
}

GridSlider.defaultProps = {
	title: '',
	data: [],
	limit: 10,
}

function PrevArrow(props) {
	const { style, onClick, className } = props
	return (
		<Button
			shape="circle"
			style={style}
			icon={<LeftOutlined />}
			onClick={onClick}
			className="grid-slider__prev-btn"
			disabled={className.includes('slick-disabled')}
		/>
	)
}

function NextArrow(props) {
	const { style, onClick, className } = props
	return (
		<Button
			shape="circle"
			style={style}
			icon={<RightOutlined />}
			onClick={onClick}
			className="grid-slider__next-btn"
			disabled={className.includes('slick-disabled')}
		/>
	)
}

const settings = {
	infinite: false,
	speed: 500,
	slidesToShow: 5,
	slidesToScroll: 5,
	nextArrow: <NextArrow />,
	prevArrow: <PrevArrow />,
}

function GridSlider({ title, data, limit }) {
	if (data.length === 0) return null
	return (
		<div className="grid-slider">
			<h3 className="grid-slider__title">{title}</h3>
			<Slider {...settings}>
				{data.slice(0, limit).map(product => (
					<ProductCart key={product.id} data={product} />
				))}
			</Slider>
		</div>
	)
}

export default GridSlider

import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import './style.scss'

HeroSlier.propTypes = {
	data: PropTypes.array,
}

HeroSlier.defaultProps = {
	data: [],
}

function PrevArrow(props) {
	const { style, onClick } = props
	return (
		<span
			style={style}
			onClick={onClick}
			className="hero-slider__btn hero-slider__prev-btn"
		>
			<LeftOutlined />
		</span>
	)
}

function NextArrow(props) {
	const { style, onClick } = props
	return (
		<span
			style={style}
			onClick={onClick}
			className="hero-slider__btn hero-slider__next-btn"
		>
			<RightOutlined />
		</span>
	)
}

const settings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 5000,
	pauseOnHover: false,
	prevArrow: <PrevArrow />,
	nextArrow: <NextArrow />,
}

function HeroSlier({ data }) {
	return (
		<section className="hero-slider">
			<Slider {...settings}>
				{data.map(banner => (
					<div key={banner.id} className="hero-slider__slide">
						<img src={banner.image} alt={banner.name} />
					</div>
				))}
			</Slider>
		</section>
	)
}

export default HeroSlier

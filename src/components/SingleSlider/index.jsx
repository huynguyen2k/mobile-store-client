import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Slider from 'react-slick'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons/lib/icons'

function NextArrow(props) {
	const { style, onClick } = props
	return (
		<Button
			style={style}
			icon={<RightOutlined />}
			onClick={onClick}
			className="next-btn"
		/>
	)
}

function PrevArrow(props) {
	const { style, onClick } = props
	return (
		<Button
			style={style}
			icon={<LeftOutlined />}
			onClick={onClick}
			className="prev-btn"
		/>
	)
}

SingleSlider.propTypes = {
	images: PropTypes.array,
	style: PropTypes.object,
}

SingleSlider.defaultProps = {
	images: [],
	style: {},
}

function SingleSlider(props) {
	const { images, style } = props

	const refSlider1 = useRef(null)
	const refSlider2 = useRef(null)

	const [slider1, setSlider1] = useState(null)
	const [slider2, setSlider2] = useState(null)

	useEffect(() => {
		setSlider1(refSlider1.current)
		setSlider2(refSlider2.current)
	}, [])

	const renderSlideList = () => {
		if (!Array.isArray(images)) return null

		return images.map((image, index) => (
			<div className="slide-img" key={index}>
				<img src={image.src} alt={image.alt} />
			</div>
		))
	}

	return (
		<div className="single-slider" style={style}>
			<div className="single-slider__top-slider">
				<Slider
					ref={refSlider1}
					asNavFor={slider2}
					nextArrow={<NextArrow />}
					prevArrow={<PrevArrow />}
				>
					{renderSlideList()}
				</Slider>
			</div>

			{images.length >= 2 && (
				<div className="single-slider__bottom-slider">
					<Slider
						ref={refSlider2}
						centerMode
						centerPadding={0}
						asNavFor={slider1}
						slidesToShow={images.length >= 5 ? 5 : images.length}
						swipeToSlide={true}
						focusOnSelect={true}
						arrows={false}
					>
						{renderSlideList()}
					</Slider>
				</div>
			)}
		</div>
	)
}

export default SingleSlider

import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import RatingItem from '../RatingItem'
import EmptyData from 'components/EmptyData'

RatingList.propTypes = {
	data: PropTypes.array,
}

RatingList.defaultProps = {
	data: [],
}

function RatingList({ data }) {
	return (
		<div className="rating-list">
			<h3 className="rating-list__title">ĐÁNH GIÁ - NHẬN XÉT TỪ KHÁCH HÀNG</h3>
			<div className="rating-list__content">
				{data.map(x => (
					<RatingItem key={x.id} data={x} />
				))}

				{data.length === 0 && (
					<EmptyData title="Chưa có đánh giá nào cho sản phẩm này" />
				)}
			</div>
		</div>
	)
}

export default RatingList

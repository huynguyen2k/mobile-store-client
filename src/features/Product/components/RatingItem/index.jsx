import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Rate } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import getTimeFromNow from 'utils/getTimeFromNow'

RatingItem.propTypes = {
	data: PropTypes.object,
}

RatingItem.defaultProps = {
	data: null,
}

function RatingItem({ data }) {
	if (!data) return null
	return (
		<div className="rating-item">
			<div className="rating-item__left-col">
				<div className="rating-item__rating-account">
					<img src={data.avatar} alt={data.full_name} />
					<div className="account-info">
						<h4 className="customer-name">{data.full_name}</h4>
						<span className="rating-time">
							Đánh giá vào {getTimeFromNow(data.created_date)}
						</span>
					</div>
				</div>
			</div>

			<div className="rating-item__right-col">
				<div className="rating-item__content">
					<Rate
						className="star-rating"
						disabled
						allowHalf
						defaultValue={data.rating}
					/>
					<div className="delivered">
						<CheckCircleFilled />
						<span className="text">Đã mua hàng</span>
					</div>
					<p className="content">{data.content}</p>
					<div className="images">
						{data.images.map(x => (
							<div className="image" key={x.id}>
								<img src={x.image} alt="" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default RatingItem

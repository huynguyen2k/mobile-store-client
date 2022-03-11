import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import moment from 'moment'

NotificationList.propTypes = {
	data: PropTypes.object,
	onMark: PropTypes.func,
}

NotificationList.defaultProps = {
	data: null,
	onMark: null,
}

function NotificationList({ data, onMark }) {
	const handleMark = id => {
		if (onMark) {
			onMark(id)
		}
	}

	if (!data) return null
	return (
		<div className="notification-list">
			<h3 className="notification-list__title">
				Thông báo của tôi ({data.unreadNumber})
			</h3>

			<div className="notification-list__content">
				{data.list.map(x => (
					<div
						key={x.id}
						className={`notification-list__item ${
							x.readStatus ? '' : 'active'
						}`}
					>
						<span className="date">
							{moment(x.created_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
						</span>
						<div className="content">
							<div className="icon">
								<svg
									stroke="currentColor"
									fill="currentColor"
									strokeWidth="0"
									viewBox="0 0 24 24"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path>
								</svg>
							</div>
							<span className="text-content">
								<h4 className="title">{x.title}</h4>
								<h4 className="message">{x.content}</h4>
							</span>
						</div>

						{!x.readStatus && (
							<span className="mark-read-btn" onClick={() => handleMark(x.id)}>
								Đánh dấu đã đọc
							</span>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default NotificationList

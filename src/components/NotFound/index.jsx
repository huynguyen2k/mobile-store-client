import React from 'react'
import './style.scss'

function NotFound() {
	return (
		<div className="not-found">
			<div className="not-found__image">
				<img src="/assets/images/404.svg" alt="not found" />
			</div>

			<div className="not-found__content">
				<h3 className="title">
					Trang này không tồn tại bạn hãy kiểm tra lại đường dẫn
				</h3>
			</div>
		</div>
	)
}

export default NotFound

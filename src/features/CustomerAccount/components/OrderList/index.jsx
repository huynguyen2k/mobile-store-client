import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import OrderItem from '../OrderItem'
import EmptyData from 'components/EmptyData'

OrderList.propTypes = {
	data: PropTypes.array,
}

OrderList.defaultProps = {
	data: [],
}

function OrderList({ data }) {
	return (
		<div className="order-list">
			<h3 className="order-list__title">Đơn hàng của tôi</h3>
			<div className="order-list__content">
				{data.map(e => (
					<OrderItem key={e.id} data={e} />
				))}

				{data.length === 0 && <EmptyData title="Chưa có đơn hàng!" />}
			</div>
		</div>
	)
}

export default OrderList

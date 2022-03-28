import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Button, Steps } from 'antd'
import formatCurrency from 'utils/formatCurrency'
import moment from 'moment'
import orderStatus from 'constants/orderStatus'
import UserRoles from 'constants/UserRoles'

OrderDetail.propTypes = {
	user: PropTypes.object,
	data: PropTypes.object,
	orderStatusList: PropTypes.array,
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
}

OrderDetail.defaultProps = {
	user: null,
	data: null,
	orderStatusList: [],
	onConfirm: null,
	onCancel: null,
}

function OrderDetail({ user, data, orderStatusList, onConfirm, onCancel }) {
	const handleConfirm = () => {
		if (onConfirm) {
			onConfirm({
				id: data.id,
				user_id: user.id,
				current_status_id: data.status_id,
				status_id: data.status_id + 1,
				created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
			})
		}
	}

	const handleCancel = () => {
		if (onCancel) {
			onCancel({
				id: data.id,
				user_id: user.id,
				current_status_id: orderStatus.cancelled.id,
				status_id: orderStatus.cancelled.id,
				created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
			})
		}
	}

	if (!data) return null
	return (
		<div className="order-detail">
			<div className="order-detail__header">
				<h4 className="title">
					Chi tiết đơn hàng #{data.id} - {data.status_name}
				</h4>
				<span className="order-date">
					Ngày đặt hàng:{' '}
					{moment(data.created_date, 'YYYY-MM-DD HH:mm:ss', true).format(
						'HH:mm DD/MM/YYYY'
					)}
				</span>
			</div>

			<div className="order-detail__content">
				<div className="order-detail__order-tracking">
					<Steps>
						{orderStatusList
							.filter(
								e =>
									e.id !== orderStatus.completed.id &&
									e.id !== orderStatus.cancelled.id
							)
							.map(e => {
								const index = data.orderStatus.findIndex(
									x => x.status_id === e.id
								)
								let status = data.status_id === e.id ? 'process' : 'wait'
								let description = ''

								if (index >= 0) {
									status = 'finish'
									description = moment(
										data.orderStatus[index].created_date,
										'YYYY-MM-DD HH:mm:ss',
										true
									).format('HH:mm DD/MM/YYYY')
								}
								return (
									<Steps.Step
										key={e.id}
										title={e.name}
										status={status}
										description={description}
									/>
								)
							})}
					</Steps>
				</div>

				<div className="order-detail__line-break"></div>

				<div className="order-detail__customer">
					<h4 className="title">Địa chỉ người nhận</h4>
					<span className="full-name">Họ tên: {data.customer_name}</span>
					<span className="phone-number">
						Số điện thoại: {data.customer_phone}
					</span>
					<span className="address">Địa chỉ: {data.customer_address}</span>
					<span className="payment">
						Hình thức thanh toán: Thanh toán khi nhận hàng
					</span>
				</div>

				<div className="order-detail__product-list">
					<div className="order-detail__row">
						<div className="order-detail__col-1">
							<span className="title">Sản phẩm</span>
						</div>
						<div className="order-detail__col-2">
							<span className="title">Số lượng</span>
						</div>
						<div className="order-detail__col-3">
							<span className="title">Đơn giá</span>
						</div>
						<div className="order-detail__col-4">
							<span className="title">Tạm tính</span>
						</div>
					</div>

					{data.orderDetail.map(e => (
						<div key={e.id} className="order-detail__row">
							<div className="order-detail__col-1">
								<div className="product">
									<img
										className="product-img"
										src={e.product_image}
										alt={e.product_name}
									/>
									<h4 className="product-name">{e.product_name}</h4>
								</div>
							</div>
							<div className="order-detail__col-2">
								<span className="product-quantity">{e.quantity}</span>
							</div>
							<div className="order-detail__col-3">
								<span className="price">{formatCurrency(e.price)}</span>
							</div>
							<div className="order-detail__col-4">
								<span className="total-price">
									{formatCurrency(e.price * e.quantity)}
								</span>
							</div>
						</div>
					))}
				</div>

				<div className="order-detail__order-info">
					<div className="left-col">
						{user.role_id !== UserRoles.CUSTOMER.id &&
							data.status_id !== orderStatus.completed.id &&
							data.status_id !== orderStatus.cancelled.id && (
								<>
									<Button size="large" type="primary" onClick={handleConfirm}>
										{data.status_id === orderStatus.waiting.id &&
											'Xác nhận đơn hàng'}
										{data.status_id === orderStatus.processing.id &&
											'Xác nhận xử lý'}
										{data.status_id === orderStatus.delivering.id &&
											'Xác nhận vận chuyển'}
										{data.status_id === orderStatus.delivered.id &&
											'Xác nhận đã giao'}
									</Button>

									<Button
										danger
										size="large"
										type="primary"
										style={{ marginLeft: 16 }}
										onClick={handleCancel}
									>
										Hủy đơn hàng
									</Button>
								</>
							)}
					</div>

					<div className="right-col">
						<div className="row">
							<span className="label">Tạm tính</span>
							<span className="content total-price">
								{formatCurrency(
									data.total_price + data.discount_value - data.delivery_cost
								)}
							</span>
						</div>
						<div className="row">
							<span className="label">Phí vận chuyển</span>
							<span className="content delivery-cost">
								{formatCurrency(data.delivery_cost)}
							</span>
						</div>
						<div className="row">
							<span className="label">Giảm giá</span>
							<span className="content discount-value">
								-{formatCurrency(data.discount_value)}
							</span>
						</div>
						<div className="row">
							<span className="label">Thành tiền</span>
							<span className="content final-price">
								{formatCurrency(data.total_price)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderDetail

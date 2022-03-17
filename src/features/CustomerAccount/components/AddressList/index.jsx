import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Button, Popconfirm, Space } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

AddressList.propTypes = {
	data: PropTypes.array,
	onAddAddress: PropTypes.func,
	onUpdateAddress: PropTypes.func,
	onDeleteAddress: PropTypes.func,
}

AddressList.defaultProps = {
	data: [],
	onAddAddress: null,
	onUpdateAddress: null,
	onDeleteAddress: null,
}

function AddressList({ data, onAddAddress, onUpdateAddress, onDeleteAddress }) {
	const handleAddAddress = () => {
		if (onAddAddress) {
			onAddAddress()
		}
	}

	const handleUpdateAddress = data => {
		if (onUpdateAddress) {
			onUpdateAddress(data)
		}
	}

	const handleDeleteAddress = async data => {
		if (onDeleteAddress) {
			await onDeleteAddress(data)
		}
	}

	return (
		<div className="address-list">
			<h3 className="address-list__title">Địa chỉ giao hàng</h3>

			<Button
				block
				size="large"
				type="dashed"
				className="address-list__add-btn"
				onClick={handleAddAddress}
			>
				Thêm địa chỉ mới
			</Button>

			<div className="address-list__content">
				{data.map(e => (
					<div key={e.id} className="address-list__item">
						<div className="address-list__item-info">
							<h4 className="name">
								{e.full_name}
								{Boolean(e.is_default) && (
									<span className="default-address">
										<CheckCircleOutlined className="icon" />
										Địa chỉ mặc định
									</span>
								)}
							</h4>
							<span className="address">Địa chỉ: {e.full_address}</span>
							<span className="phone">Điện thoại: {e.phone_number}</span>
						</div>

						<div className="address-list__item-action">
							<Space>
								<Button
									type="primary"
									shape="default"
									size="middle"
									onClick={() => handleUpdateAddress(e)}
								>
									Chỉnh sửa
								</Button>

								{!e.is_default && (
									<Popconfirm
										okText="Có"
										cancelText="Không"
										placement="topRight"
										title="Bạn có chắc là muốn xóa địa chỉ này không?"
										onConfirm={async () => await handleDeleteAddress(e)}
									>
										<Button danger type="primary" shape="default" size="middle">
											Xóa
										</Button>
									</Popconfirm>
								)}
							</Space>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AddressList

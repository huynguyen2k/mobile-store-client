import { Dropdown, Menu } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import {
	BellOutlined,
	FileTextOutlined,
	HeartOutlined,
	LogoutOutlined,
	ShoppingOutlined,
	StarOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

HeaderAccount.propTypes = {
	loggedIn: PropTypes.bool,
	user: PropTypes.object,
	notification: PropTypes.object,
	onLogout: PropTypes.func,
}

HeaderAccount.defaultProps = {
	loggedIn: false,
	user: null,
	notification: null,
	onLogout: () => {},
}

function HeaderAccount({ loggedIn, user, notification, onLogout }) {
	const location = useLocation()

	return (
		<>
			{loggedIn ? (
				<Dropdown
					arrow
					placement="bottomCenter"
					overlayClassName="drop-down"
					overlay={
						<Menu className="drop-down__list">
							<Menu.Item key={1} icon={<UserOutlined />}>
								<Link to="/customer/account">Thông tin tài khoản</Link>
							</Menu.Item>
							<Menu.Item key={2} icon={<BellOutlined />}>
								<Link to="/customer/notification">
									<span>Thông báo của tôi</span>

									{notification && notification.unreadNumber > 0 && (
										<span className="notification-number">
											{notification.unreadNumber <= 99
												? notification.unreadNumber
												: '99+'}
										</span>
									)}
								</Link>
							</Menu.Item>
							<Menu.Item key={3} icon={<ShoppingOutlined />}>
								<Link to="/customer/order">Đơn hàng của tôi</Link>
							</Menu.Item>
							<Menu.Item key={4} icon={<FileTextOutlined />}>
								<Link to="/customer/address">Địa chỉ giao hàng</Link>
							</Menu.Item>
							<Menu.Item key={5} icon={<HeartOutlined />}>
								<Link to="/customer/favorite-product">Sản phẩm yêu thích</Link>
							</Menu.Item>
							<Menu.Item key={6} icon={<StarOutlined />}>
								<Link to="/customer/product-rating">
									Nhận xét sản phẩm đã mua
								</Link>
							</Menu.Item>
							<Menu.Item key={7} icon={<LogoutOutlined />} onClick={onLogout}>
								<span>Đăng xuất tài khoản</span>
							</Menu.Item>
						</Menu>
					}
				>
					<div className="header-account">
						<img className="icon" src={user.avatar} alt={user.full_name} />
						<div className="info">
							<div className="title">Tài khoản</div>
							<div className="username">{user.full_name}</div>
						</div>
					</div>
				</Dropdown>
			) : (
				<Link className="header-account" to="/login" state={{ from: location }}>
					<img
						className="icon"
						src="/assets/images/user-icon.png"
						alt="user icon"
					/>
					<div className="info">
						<div className="title">Đăng nhập / đăng ký</div>
						<div className="username">Tài khoản</div>
					</div>
				</Link>
			)}
		</>
	)
}

export default HeaderAccount

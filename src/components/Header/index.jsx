import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Badge } from 'antd'
import Container from 'components/Container'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './style.scss'

function Header() {
	return (
		<header className="header">
			<Container>
				<div className="header__container">
					<div className="header__left">
						<Link className="header__logo" to="/">
							Mobile Store
						</Link>
					</div>

					<div className="header__center">
						<ul className="header__menu">
							<li>
								<NavLink
									to="/"
									className={({ isActive }) => (isActive ? 'active' : '')}
								>
									Trang chủ
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/product"
									className={({ isActive }) => (isActive ? 'active' : '')}
								>
									Sản phẩm
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/brand"
									className={({ isActive }) => (isActive ? 'active' : '')}
								>
									Thương hiệu
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/contact"
									className={({ isActive }) => (isActive ? 'active' : '')}
								>
									Liên hệ
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/support"
									className={({ isActive }) => (isActive ? 'active' : '')}
								>
									Hỗ trợ
								</NavLink>
							</li>
						</ul>
					</div>

					<div className="header__right">
						<div className="header__account">
							<img
								src="/assets/images/user-icon.png"
								alt="user icon"
								className="icon"
							/>

							<div className="info">
								<div className="title">Tài khoản</div>
								<div className="username">Nguyễn Quốc Huy</div>
							</div>
						</div>

						<div className="header__cart">
							<Badge count={1000} size="small">
								<img
									src="/assets/images/shopping-cart-icon.png"
									alt="cart icon"
									className="icon"
								/>
							</Badge>
							<span className="title">Giỏ hàng</span>
						</div>
					</div>
				</div>
			</Container>
		</header>
	)
}

export default Header

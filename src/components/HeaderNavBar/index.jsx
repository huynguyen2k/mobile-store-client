import React from 'react'
import './style.scss'
import { NavLink } from 'react-router-dom'

function HeaderNavBar() {
	return (
		<ul className="header-nav-bar">
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
	)
}

export default HeaderNavBar

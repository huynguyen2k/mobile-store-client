import { Layout, Menu } from 'antd'
import React from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import menuList from 'constants/AdminMenu'
import './style.scss'
import { useSelector } from 'react-redux'
import UserRoles from 'constants/UserRoles'

function Admin() {
	const user = useSelector(state => state.auth.user)
	const location = useLocation()

	const renderMenuList = () => {
		if (!Array.isArray(menuList)) return null

		return menuList.map(menuItem => {
			if (menuItem.subMenu) {
				const { subMenu, ...props } = menuItem

				return (
					<Menu.SubMenu {...props}>
						{subMenu.map(subMenuItem => (
							<Menu.Item key={subMenuItem.link}>
								<Link to={subMenuItem.link}>{subMenuItem.title}</Link>
							</Menu.Item>
						))}
					</Menu.SubMenu>
				)
			}

			return (
				<Menu.Item key={menuItem.link}>
					<Link to={menuItem.link}>
						{menuItem.icon}
						<span>{menuItem.title}</span>
					</Link>
				</Menu.Item>
			)
		})
	}

	if (user?.role_name !== UserRoles.ADMIN.name) {
		return <Navigate to="/login" replace />
	}
	return (
		<Layout hasSider className="dashboard">
			<Layout.Sider className="dashboard__sider" width={250}>
				<div className="dashboard__logo">
					<Link className="logo-link" to=".">
						<img
							className="logo-img"
							src="/assets/images/logo-shop.png"
							alt="Logo shop"
						/>
						<span className="logo-name">Mobile Store</span>
					</Link>
				</div>

				<Menu
					theme="dark"
					mode="inline"
					inlineIndent={16}
					selectedKeys={[location.pathname]}
				>
					{renderMenuList()}
				</Menu>
			</Layout.Sider>

			<main className="dashboard__main">
				<header className="dashboard__header">This is header</header>

				<div className="dashboard__content">
					<Outlet />
				</div>
			</main>
		</Layout>
	)
}

export default Admin

import { Layout, Menu } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './style.scss'

DashboardSider.propTypes = {
	menuList: PropTypes.array,
}

DashboardSider.defaultProps = {
	menuList: [],
}

function DashboardSider({ menuList }) {
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

	return (
		<Layout.Sider className="dashboard-sider" width={250}>
			<div className="dashboard-sider__shop-logo">
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
	)
}

export default DashboardSider

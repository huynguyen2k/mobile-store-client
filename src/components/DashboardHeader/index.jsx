import {
	BellOutlined,
	EllipsisOutlined,
	MenuFoldOutlined,
	MessageOutlined,
	SearchOutlined,
} from '@ant-design/icons/lib/icons'
import { Button } from 'antd'
import DashboardProfile from 'components/DashboardProfile'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

DashboardHeader.propTypes = {
	user: PropTypes.object,
	onLogout: PropTypes.func,
}

DashboardHeader.defaultProps = {
	user: null,
	onLogout: null,
}

function DashboardHeader({ user, onLogout }) {
	return (
		<header className="dashboard-header">
			<div className="dashboard-header__left">
				<div className="menu-icon">
					<MenuFoldOutlined />
				</div>
			</div>

			<div className="dashboard-header__right">
				<div className="header-right-item">
					<Button icon={<SearchOutlined />} size="middle" shape="circle" />
				</div>
				<div className="header-right-item">
					<Button icon={<MessageOutlined />} size="middle" shape="circle" />
				</div>
				<div className="header-right-item">
					<Button icon={<BellOutlined />} size="middle" shape="circle" />
				</div>
				<div className="header-right-item">
					<Button icon={<EllipsisOutlined />} size="middle" shape="circle" />
				</div>
				<DashboardProfile user={user} onLogout={onLogout} />
			</div>
		</header>
	)
}

export default DashboardHeader

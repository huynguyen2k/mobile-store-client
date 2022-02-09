import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Dropdown, Menu } from 'antd'
import {
	EditOutlined,
	LoginOutlined,
	UserOutlined,
} from '@ant-design/icons/lib/icons'

DashboardProfile.propTypes = {
	user: PropTypes.object,
	onLogout: PropTypes.func,
}

DashboardProfile.defaultProps = {
	user: null,
	onLogout: null,
}

function DashboardProfile({ user, onLogout }) {
	const handleLogout = () => {
		if (onLogout) {
			onLogout()
		}
	}

	if (!user) return null
	return (
		<Dropdown
			trigger={['click']}
			placement="bottomRight"
			overlayClassName="profile-dropdown"
			overlay={
				<Menu>
					<Menu.Item key="1">
						<div className="profile-dropdown__item">
							<UserOutlined />
							<span className="text">Thông tin tài khoản</span>
						</div>
					</Menu.Item>
					<Menu.Item key="2">
						<div className="profile-dropdown__item">
							<EditOutlined />
							<span className="text">Thay đổi mật khẩu</span>
						</div>
					</Menu.Item>
					<Menu.Item key="3" onClick={handleLogout}>
						<div className="profile-dropdown__item">
							<LoginOutlined />
							<span className="text">Đăng xuất</span>
						</div>
					</Menu.Item>
				</Menu>
			}
		>
			<div className="dashboard-profile">
				<Avatar src={user.avatar} alt="avatar" shape="circle" size={40} />
				<div className="dashboard-profile__info">
					<span className="name">{user.full_name}</span>
					<span className="role">{user.role_name}</span>
				</div>
			</div>
		</Dropdown>
	)
}

export default DashboardProfile

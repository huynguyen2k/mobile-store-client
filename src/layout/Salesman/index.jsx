import { Layout } from 'antd'
import DashboardHeader from 'components/DashboardHeader'
import DashboardMain from 'components/DashboardMain'
import DashboardSider from 'components/DashboardSider'
import menuList from 'constants/SalesmanMenu'
import UserRoles from 'constants/UserRoles'
import { logout } from 'features/Auth/authSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import './style.scss'

function SalesmanLayout() {
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)

	const handleLogout = () => {
		dispatch(logout())
	}

	if (user?.role_name !== UserRoles.SALESMAN.name) {
		return <Navigate to="/login" replace />
	}
	return (
		<Layout hasSider>
			<DashboardSider menuList={menuList} />
			<DashboardHeader user={user} onLogout={handleLogout} />
			<DashboardMain />
		</Layout>
	)
}

export default SalesmanLayout

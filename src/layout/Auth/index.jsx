import React from 'react'
import { Outlet } from 'react-router-dom'
import './style.scss'

function AuthLayout() {
	return (
		<div className="auth-template">
			<Outlet />
		</div>
	)
}

export default AuthLayout

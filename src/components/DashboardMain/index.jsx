import React from 'react'
import { Outlet } from 'react-router-dom'
import './style.scss'

function DashboardMain() {
	return (
		<main className="dashboard-main">
			<Outlet />
		</main>
	)
}

export default DashboardMain

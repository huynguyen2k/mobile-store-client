import Footer from 'components/Footer'
import Header from 'components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import './style.scss'

function CustomerLayout() {
	return (
		<div className="customer-layout">
			<Header />
			<main className="customer-layout__main">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default CustomerLayout

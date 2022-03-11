import Container from 'components/Container'
import HeaderAccount from 'components/HeaderAccount'
import HeaderCart from 'components/HeaderCart'
import HeaderNavBar from 'components/HeaderNavBar'
import { logout } from 'features/Auth/authSlice'
import { getCustomerNotification } from 'features/CustomerAccount/customerSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'

function Header() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const user = useSelector(state => state.auth.user)
	const loggedIn = useSelector(state => state.auth.loggedIn)
	const notification = useSelector(state => state.customer.notification)

	useEffect(() => {
		if (!user) return
		;(async () => {
			try {
				await dispatch(getCustomerNotification(user.id)).unwrap()
			} catch (error) {
				console.log(error)
			}
		})()
	}, [dispatch, user])

	const handleLogout = () => {
		dispatch(logout())
		navigate('/', { replace: true })
	}

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
						<HeaderNavBar />
					</div>

					<div className="header__right">
						<HeaderAccount
							loggedIn={loggedIn}
							user={user}
							notification={notification}
							onLogout={handleLogout}
						/>
						<HeaderCart />
					</div>
				</div>
			</Container>
		</header>
	)
}

export default Header

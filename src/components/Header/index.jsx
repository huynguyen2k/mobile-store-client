import productApi from 'api/productApi'
import Container from 'components/Container'
import HeaderAccount from 'components/HeaderAccount'
import HeaderCart from 'components/HeaderCart'
import HeaderNavBar from 'components/HeaderNavBar'
import HeaderSearch from 'components/HeaderSearch'
import SearchBox from 'components/SearchBox'
import { logout } from 'features/Auth/authSlice'
import { getAllCartItems, resetCartItems } from 'features/Cart/cartSlice'
import { getCustomerNotification } from 'features/CustomerAccount/customerSlice'
import useFetchData from 'hooks/useFetchData'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'

function Header() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const user = useSelector(state => state.auth.user)
	const loggedIn = useSelector(state => state.auth.loggedIn)
	const notification = useSelector(state => state.customer.notification)
	const cartItems = useSelector(state => state.cart.cartItems)

	const [openSearch, setOpenSearch] = useState(false)
	const { data: productList } = useFetchData(productApi.getAll)
	const productOptions = useMemo(() => {
		return productList.map(x => ({ value: x.name }))
	}, [productList])

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

	useEffect(() => {
		if (!user) return
		;(async () => {
			try {
				await dispatch(getAllCartItems(user.id)).unwrap()
			} catch (error) {
				console.log(error)
			}
		})()
	}, [dispatch, user])

	const handleLogout = () => {
		dispatch(logout())
		dispatch(resetCartItems())

		navigate('/', { replace: true })
	}

	const handleSearchClick = () => {
		setOpenSearch(state => !state)
	}

	const handleSearchSubmit = value => {
		if (value.length > 0) {
			navigate(`/product?product_name=${value}`)
			setOpenSearch(false)
		}
	}

	return (
		<header className="header">
			{openSearch && (
				<SearchBox optionList={productOptions} onSubmit={handleSearchSubmit} />
			)}

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
						<HeaderSearch onClick={handleSearchClick} />

						<HeaderAccount
							loggedIn={loggedIn}
							user={user}
							notification={notification}
							onLogout={handleLogout}
						/>

						<HeaderCart quantity={cartItems.length} />
					</div>
				</div>
			</Container>
		</header>
	)
}

export default Header

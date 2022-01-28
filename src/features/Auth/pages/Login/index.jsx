import UserRoles from 'constants/UserRoles'
import { login } from 'features/Auth/authSlice'
import LoginForm from 'features/Auth/components/LoginForm'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './style.scss'

function LoginPage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isSubmitted, setIsSubmitted] = useState(false)
	const loggedIn = useSelector(state => state.auth.loggedIn)

	const handleSubmit = async values => {
		try {
			setIsSubmitted(true)
			const user = await dispatch(login(values)).unwrap()

			if (user.role_name === UserRoles.ADMIN) {
				return navigate('/admin', { replace: true })
			}
			if (user.role_name === UserRoles.SALESMAN) {
				return navigate('/salesman', { replace: true })
			}
			if (user.role_name === UserRoles.WAREHOUSE_MANAGER) {
				return navigate('/warehouse-manager', { replace: true })
			}
			return navigate(-1)
		} catch (error) {
			Swal.fire({
				title: 'Thông báo!',
				text: error.message,
				icon: 'error',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
		}
	}

	if (!isSubmitted && loggedIn) {
		return <Navigate to="/" replace />
	}
	return (
		<>
			<LoginForm onSubmit={handleSubmit} />
		</>
	)
}

export default LoginPage

import { register } from 'features/Auth/authSlice'
import RegisterForm from 'features/Auth/components/RegisterForm'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './style.scss'

function RegisterPage() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = async values => {
		try {
			const response = await dispatch(register(values)).unwrap()
			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})

			navigate('/login', { replace: true })
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

	return (
		<>
			<RegisterForm onSubmit={handleSubmit} />
		</>
	)
}

export default RegisterPage

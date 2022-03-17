import { Modal } from 'antd'
import { update } from 'features/Auth/authSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import AccountForm from '../components/AccountForm'
import UpdatePasswordForm from '../components/UpdatePasswordForm'
import userApi from 'api/userApi'

function AccountPage() {
	const [isModalVisible, setIsModalVisible] = useState(false)

	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)

	const handleUpdateAccount = async data => {
		const formData = new FormData()
		for (const key in data) {
			formData.append(key, data[key])
		}

		try {
			await dispatch(update(formData)).unwrap()
			Swal.fire({
				title: 'Thông báo!',
				text: 'Cập nhật thông tin tài khoản thành công!',
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
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

	const handleChangePassword = async data => {
		try {
			await sleep(1000)
			const response = await userApi.updatePassword(data)

			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
			setIsModalVisible(false)
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
		<div style={{ padding: '48px 0' }}>
			<AccountForm
				data={user}
				onSubmit={handleUpdateAccount}
				onChangePassword={() => setIsModalVisible(true)}
			/>

			<Modal
				centered
				destroyOnClose
				width={680}
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<UpdatePasswordForm onSubmit={handleChangePassword} />
			</Modal>
		</div>
	)
}

export default AccountPage

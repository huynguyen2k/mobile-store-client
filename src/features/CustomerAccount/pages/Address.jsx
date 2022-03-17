import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import AddressForm from '../components/AddressForm'
import AddressList from '../components/AddressList'
import {
	addAddress,
	deleteAddress,
	getAddressList,
	updateAddress,
} from '../customerSlice'

const contentMode = {
	addForm: 'addForm',
	updateForm: 'updateForm',
}

function AddressPage() {
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const addressList = useSelector(state => state.customer.addressList)

	const [addressData, setAddressData] = useState(null)
	const [modalContent, setModalContent] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	useEffect(() => {
		if (!user) return
		;(async () => {
			try {
				await dispatch(getAddressList(user.id)).unwrap()
			} catch (error) {
				console.log(error)
			}
		})()
	}, [dispatch, user])

	const handleAddAddress = async data => {
		const newData = {
			...data,
			user_id: user.id,
		}

		try {
			await sleep(1000)
			await dispatch(addAddress(newData)).unwrap()

			await Swal.fire({
				title: 'Thông báo!',
				text: 'Thêm địa chỉ mới thành công!',
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

	const handleUpdateAddress = async data => {
		try {
			await sleep(1000)
			await dispatch(updateAddress(data)).unwrap()

			await Swal.fire({
				title: 'Thông báo!',
				text: 'Cập nhật địa chỉ thành công!',
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

	const handleDeleteAddress = async data => {
		try {
			await sleep(1000)
			const response = await dispatch(deleteAddress(data)).unwrap()

			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
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

	return (
		<div style={{ padding: '48px 0' }}>
			<AddressList
				data={addressList}
				onAddAddress={() => {
					setModalContent(contentMode.addForm)
					setIsModalVisible(true)
				}}
				onUpdateAddress={data => {
					setAddressData(data)
					setModalContent(contentMode.updateForm)
					setIsModalVisible(true)
				}}
				onDeleteAddress={handleDeleteAddress}
			/>

			<Modal
				centered
				destroyOnClose
				width={680}
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				{contentMode.addForm === modalContent && (
					<AddressForm
						title="Thêm địa chỉ mới"
						submitText="Thêm địa chỉ"
						onSubmit={handleAddAddress}
					/>
				)}

				{contentMode.updateForm === modalContent && (
					<AddressForm
						title="Cập nhật địa chỉ"
						submitText="Cập nhật địa chỉ"
						data={addressData}
						onSubmit={handleUpdateAddress}
					/>
				)}
			</Modal>
		</div>
	)
}

export default AddressPage

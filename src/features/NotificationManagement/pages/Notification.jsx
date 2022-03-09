import { Modal, notification } from 'antd'
import notificationApi from 'api/notificationApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import AddNotificationForm from '../components/AddNotificationForm'
import NotificationTable from '../components/NotificationTable'
import UpdateNotificationForm from '../components/UpdateNotificationForm'

const contentMode = {
	addForm: 'addForm',
	updateForm: 'updateForm',
}

function NotificationPage() {
	const user = useSelector(state => state.auth.user)
	const [notificationData, setNotificationData] = useState(null)
	const [modalContent, setModalContent] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const { loading, data, refetchData } = useFetchData(notificationApi.getAll)
	const notificationList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	const handleChangePublicStatus = async data => {
		try {
			const response = await notificationApi.update(data)
			notification.success({
				message: response.message,
			})
			refetchData()
		} catch (error) {
			console.log(error)
		}
	}

	const handleAddNotification = () => {
		setModalContent(contentMode.addForm)
		setIsModalVisible(true)
	}

	const handleUpdateNotification = data => {
		setNotificationData(data)
		setModalContent(contentMode.updateForm)
		setIsModalVisible(true)
	}

	const handleDeleteNotification = async idList => {
		try {
			await sleep(1000)
			await Promise.all(idList.map(id => notificationApi.delete(id)))
			await Swal.fire({
				title: 'Thông báo!',
				text: 'Bạn đã xóa thành công!',
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
			refetchData()
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

	const handleAddNotificationSubmit = async data => {
		const newData = { ...data, user_id: user.id }

		try {
			await sleep(1000)
			const response = await notificationApi.add(newData)
			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})

			setIsModalVisible(false)
			refetchData()
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

	const handleUpdateNotificationSubmit = async data => {
		try {
			await sleep(1000)
			const response = await notificationApi.update(data)
			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})

			setIsModalVisible(false)
			refetchData()
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
			<Modal
				centered
				destroyOnClose
				width={650}
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				{modalContent === contentMode.addForm && (
					<AddNotificationForm onSubmit={handleAddNotificationSubmit} />
				)}

				{modalContent === contentMode.updateForm && (
					<UpdateNotificationForm
						data={notificationData}
						onSubmit={handleUpdateNotificationSubmit}
					/>
				)}
			</Modal>

			<NotificationTable
				loading={loading}
				data={notificationList}
				onAddNotification={handleAddNotification}
				onUpdateNotification={handleUpdateNotification}
				onDeleteNotification={handleDeleteNotification}
				onChangePublicStatus={handleChangePublicStatus}
			/>
		</>
	)
}

export default NotificationPage

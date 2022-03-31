import { Modal } from 'antd'
import userApi from 'api/userApi'
import UserRoles from 'constants/UserRoles'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import AddStaffForm from '../components/AddStaffForm'
import StaffTable from '../components/StaffTable'
import UpdateStaffForm from '../components/UpdateStaffForm'

const contentMode = {
	addStaffForm: 'addStaffForm',
	updateStaffForm: 'updateStaffForm',
}

function StaffPage() {
	const [userData, setUserData] = useState(null)
	const [modalContent, setModalContent] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const {
		loading,
		data,
		refetchData: refetchStaffList,
	} = useFetchData(userApi.getAllStaff)

	const { data: roleList } = useFetchData(userApi.getAllRole)
	const staffRoleList = useMemo(() => {
		return roleList
			.filter(roleItem => roleItem.name !== UserRoles.CUSTOMER.name)
			.map(roleItem => ({
				value: roleItem.id,
				label: roleItem.name,
			}))
	}, [roleList])

	const staffList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	const handleAddStaff = () => {
		setModalContent(contentMode.addStaffForm)
		setIsModalVisible(true)
	}

	const handleAddStaffSubmit = async values => {
		const formData = new FormData()
		for (const key in values) {
			formData.append(key, values[key])
		}

		try {
			await sleep(1000)
			const response = await userApi.add(formData)
			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})

			setIsModalVisible(false)
			refetchStaffList()
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

	const handleUpdateStaff = data => {
		setUserData(data)
		setModalContent(contentMode.updateStaffForm)
		setIsModalVisible(true)
	}

	const handleUpdateStaffSubmit = async values => {
		const formData = new FormData()
		for (const key in values) {
			formData.append(key, values[key])
		}

		try {
			await sleep(1000)
			const response = await userApi.update(formData)
			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})

			setIsModalVisible(false)
			refetchStaffList()
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

	const handleDeleteStaff = async idList => {
		try {
			await sleep(1000)
			await Promise.all(idList.map(id => userApi.delete(id)))
			await Swal.fire({
				title: 'Thông báo!',
				text: 'Bạn đã xóa thành công!',
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
			refetchStaffList()
		} catch (error) {
			console.log(error)
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
				{modalContent === contentMode.addStaffForm && (
					<AddStaffForm
						roleList={staffRoleList}
						onSubmit={handleAddStaffSubmit}
					/>
				)}

				{modalContent === contentMode.updateStaffForm && (
					<UpdateStaffForm
						updateData={userData}
						roleList={staffRoleList}
						onSubmit={handleUpdateStaffSubmit}
					/>
				)}
			</Modal>

			<StaffTable
				loading={loading}
				data={staffList}
				roleList={roleList}
				onAddStaff={handleAddStaff}
				onUpdateStaff={handleUpdateStaff}
				onDeleteStaff={handleDeleteStaff}
			/>
		</>
	)
}

export default StaffPage

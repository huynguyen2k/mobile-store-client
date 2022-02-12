import { Modal } from 'antd'
import userApi from 'api/userApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo, useState } from 'react'
import AddStaffForm from '../components/AddStaffForm'
import StaffTable from '../components/StaffTable'

function StaffPage() {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { loading, data } = useFetchData(userApi.getAllStaff)
	const { data: roleList } = useFetchData(userApi.getAllRole)

	const staffList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	const handleAddStaff = () => {
		setIsModalVisible(true)
	}

	const handleAddStaffSubmit = data => {
		console.log(data)
	}

	const handleUpdateStaff = data => {
		console.log('update: ', data)
	}

	const handleDeleteStaff = idList => {
		console.log('delete: ', idList)
	}

	return (
		<>
			<Modal
				centered
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<AddStaffForm onSubmit={handleAddStaffSubmit} />
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

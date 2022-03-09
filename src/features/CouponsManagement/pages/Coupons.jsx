import { Modal } from 'antd'
import couponsApi from 'api/couponsApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import AddCouponsForm from '../components/AddCouponsForm'
import CouponsTable from '../components/CouponsTable'
import UpdateCouponsForm from '../components/UpdateCouponsForm/UpdateCouponsForm'

const contentMode = {
	addForm: 'addForm',
	updateForm: 'updateForm',
}

function CouponsPage() {
	const user = useSelector(state => state.auth.user)
	const [couponsData, setCouponsData] = useState(null)
	const [modalContent, setModalContent] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const { loading, data, refetchData } = useFetchData(couponsApi.getAll)
	const couponsList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	const handleAddCoupons = () => {
		setModalContent(contentMode.addForm)
		setIsModalVisible(true)
	}

	const handleUpdateCoupons = data => {
		setCouponsData(data)
		setModalContent(contentMode.updateForm)
		setIsModalVisible(true)
	}

	const handleDeleteCoupons = async idList => {
		try {
			await sleep(1000)
			await Promise.all(idList.map(id => couponsApi.delete(id)))
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

	const handleAddCouponsSubmit = async data => {
		const newData = { ...data, user_id: user.id }

		try {
			await sleep(1000)
			const response = await couponsApi.add(newData)
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

	const handleUpdateCouponsSubmit = async data => {
		try {
			await sleep(1000)
			const response = await couponsApi.update(data)
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
					<AddCouponsForm onSubmit={handleAddCouponsSubmit} />
				)}

				{modalContent === contentMode.updateForm && (
					<UpdateCouponsForm
						data={couponsData}
						onSubmit={handleUpdateCouponsSubmit}
					/>
				)}
			</Modal>

			<CouponsTable
				loading={loading}
				data={couponsList}
				onAddCoupons={handleAddCoupons}
				onUpdateCoupons={handleUpdateCoupons}
				onDeleteCoupons={handleDeleteCoupons}
			/>
		</>
	)
}

export default CouponsPage

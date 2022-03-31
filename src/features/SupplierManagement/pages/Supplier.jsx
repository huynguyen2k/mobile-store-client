import { Modal } from 'antd'
import supplierApi from 'api/supplierApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import AddSupplierForm from '../components/AddSupplierForm'
import SupplierTable from '../components/SupplierTable'
import UpdateSupplierForm from '../components/UpdateSupplierForm'

const contentMode = {
	addForm: 'addForm',
	updateForm: 'updateForm',
}

function SupplierPage() {
	const [supplierData, setSupplierData] = useState(null)
	const [modalContent, setModalContent] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const { loading, data, refetchData } = useFetchData(supplierApi.getAll)
	const supplierList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	const handleAddSupplier = () => {
		setModalContent(contentMode.addForm)
		setIsModalVisible(true)
	}

	const handleUpdateSupplier = data => {
		setSupplierData(data)
		setModalContent(contentMode.updateForm)
		setIsModalVisible(true)
	}

	const handleDeleteSupplier = async idList => {
		try {
			await sleep(1000)
			await Promise.all(idList.map(id => supplierApi.delete(id)))
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

	const handleAddSupplierSubmit = async data => {
		try {
			await sleep(1000)
			const response = await supplierApi.add(data)
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

	const handleUpdateSupplierSubmit = async data => {
		try {
			await sleep(1000)
			const response = await supplierApi.update(data)
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
					<AddSupplierForm onSubmit={handleAddSupplierSubmit} />
				)}

				{modalContent === contentMode.updateForm && (
					<UpdateSupplierForm
						data={supplierData}
						onSubmit={handleUpdateSupplierSubmit}
					/>
				)}
			</Modal>

			<SupplierTable
				loading={loading}
				data={supplierList}
				onAddSupplier={handleAddSupplier}
				onUpdateSupplier={handleUpdateSupplier}
				onDeleteSupplier={handleDeleteSupplier}
			/>
		</>
	)
}

export default SupplierPage

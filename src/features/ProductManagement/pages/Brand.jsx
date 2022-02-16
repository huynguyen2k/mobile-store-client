import { Modal, notification } from 'antd'
import brandApi from 'api/brandApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import AddBrandForm from '../components/AddBrandForm'
import BrandTable from '../components/BrandTable'
import UpdateBrandForm from '../components/UpdateBrandForm'

const contentMode = {
	addBrandForm: 'addBrandForm',
	updateBrandForm: 'updateBrandForm',
}

function BrandPage() {
	const [brandData, setBrandData] = useState(null)
	const [modalContent, setModalContent] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const { loading, data, refetchData } = useFetchData(brandApi.getAll)
	const brandList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	const handleChangePublicStatus = async data => {
		try {
			const response = await brandApi.update(data)
			notification.success({
				message: response.message,
			})
			refetchData()
		} catch (error) {
			console.log(error)
		}
	}

	const handleAddBrand = () => {
		setModalContent(contentMode.addBrandForm)
		setIsModalVisible(true)
	}

	const handleUpdateBrand = data => {
		setBrandData(data)
		setModalContent(contentMode.updateBrandForm)
		setIsModalVisible(true)
	}

	const handleDeleteBrand = async idList => {
		try {
			await sleep(1000)
			await Promise.all(idList.map(id => brandApi.delete(id)))
			await Swal.fire({
				title: 'Thông báo!',
				text: 'Bạn đã xóa thành công!',
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
			refetchData()
		} catch (error) {
			console.log(error)
		}
	}

	const handleAddBrandSubmit = async data => {
		try {
			await sleep(1000)
			const response = await brandApi.add(data)
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

	const handleUpdateBrandSubmit = async data => {
		try {
			await sleep(1000)
			const response = await brandApi.update(data)
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
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				{modalContent === contentMode.addBrandForm && (
					<AddBrandForm onSubmit={handleAddBrandSubmit} />
				)}

				{modalContent === contentMode.updateBrandForm && (
					<UpdateBrandForm
						data={brandData}
						onSubmit={handleUpdateBrandSubmit}
					/>
				)}
			</Modal>

			<BrandTable
				loading={loading}
				data={brandList}
				onAddBrand={handleAddBrand}
				onUpdateBrand={handleUpdateBrand}
				onDeleteBrand={handleDeleteBrand}
				onChangePublicStatus={handleChangePublicStatus}
			/>
		</>
	)
}

export default BrandPage

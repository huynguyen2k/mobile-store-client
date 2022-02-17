import { Modal, notification } from 'antd'
import bannerApi from 'api/bannerApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import AddBannerForm from '../components/AddBannerForm'
import BannerTable from '../components/BannerTable'
import UpdateBannerForm from '../components/UpdateBannerForm'

const contentMode = {
	addForm: 'addForm',
	updateForm: 'updateForm',
}

function BannerPage() {
	const [bannerData, setBannerData] = useState(null)
	const [modalContent, setModalContent] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const { loading, data, refetchData } = useFetchData(bannerApi.getAll)
	const bannerList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	const handleChangePublicStatus = async data => {
		try {
			const response = await bannerApi.update(data)
			notification.success({
				message: response.message,
			})
			refetchData()
		} catch (error) {
			console.log(error)
		}
	}

	const handleAddBanner = () => {
		setModalContent(contentMode.addForm)
		setIsModalVisible(true)
	}

	const handleUpdateBanner = data => {
		setBannerData(data)
		setModalContent(contentMode.updateForm)
		setIsModalVisible(true)
	}

	const handleDeleteBanner = async idList => {
		try {
			await sleep(1000)
			await Promise.all(idList.map(id => bannerApi.delete(id)))
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

	const handleAddBannerSubmit = async data => {
		try {
			await sleep(1000)
			const response = await bannerApi.add(data)
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

	const handleUpdateBannerSubmit = async data => {
		try {
			await sleep(1000)
			const response = await bannerApi.update(data)
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
				{modalContent === contentMode.addForm && (
					<AddBannerForm onSubmit={handleAddBannerSubmit} />
				)}

				{modalContent === contentMode.updateForm && (
					<UpdateBannerForm
						data={bannerData}
						onSubmit={handleUpdateBannerSubmit}
					/>
				)}
			</Modal>

			<BannerTable
				loading={loading}
				data={bannerList}
				onAddBanner={handleAddBanner}
				onUpdateBanner={handleUpdateBanner}
				onDeleteBanner={handleDeleteBanner}
				onChangePublicStatus={handleChangePublicStatus}
			/>
		</>
	)
}

export default BannerPage

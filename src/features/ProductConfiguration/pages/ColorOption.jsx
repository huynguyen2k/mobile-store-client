import { Modal } from 'antd'
import colorOptionApi from 'api/colorOptionApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import OptionTable from '../components/OptionTable'
import AddOptionForm from '../components/AddOptionForm'
import UpdateOptionForm from '../components/UpdateOptionForm'

const contentMode = {
	addForm: 'addForm',
	updateForm: 'updateForm',
}

function ColorOptionPage() {
	const [optionData, setOptionData] = useState(null)
	const [modalContent, setModalContent] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const { loading, data, refetchData } = useFetchData(colorOptionApi.getAll)
	const optionList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	const handleAddOption = () => {
		setModalContent(contentMode.addForm)
		setIsModalVisible(true)
	}

	const handleUpdateOption = data => {
		setOptionData(data)
		setModalContent(contentMode.updateForm)
		setIsModalVisible(true)
	}

	const handleDeleteOption = async idList => {
		try {
			await sleep(1000)
			await Promise.all(idList.map(id => colorOptionApi.delete(id)))
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

	const handleAddOptionSubmit = async data => {
		try {
			await sleep(1000)
			const response = await colorOptionApi.add(data)
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

	const handleUpdateOptionSubmit = async data => {
		try {
			await sleep(1000)
			const response = await colorOptionApi.update(data)
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
					<AddOptionForm onSubmit={handleAddOptionSubmit} />
				)}

				{modalContent === contentMode.updateForm && (
					<UpdateOptionForm
						data={optionData}
						onSubmit={handleUpdateOptionSubmit}
					/>
				)}
			</Modal>

			<OptionTable
				title="Cấu hình màu sắc"
				loading={loading}
				data={optionList}
				onAddOption={handleAddOption}
				onUpdateOption={handleUpdateOption}
				onDeleteOption={handleDeleteOption}
			/>
		</>
	)
}

export default ColorOptionPage

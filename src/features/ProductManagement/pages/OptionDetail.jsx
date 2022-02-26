import OptionTable from '../components/OptionTable'
import useProductDetail from 'hooks/useProductDetail'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import sleep from 'utils/sleep'
import productApi from 'api/productApi'
import Swal from 'sweetalert2'
import { Modal } from 'antd'
import AddOptionForm from '../components/AddOptionForm'
import useFetchData from 'hooks/useFetchData'
import ramOptionApi from 'api/ramOptionApi'
import romOptionApi from 'api/romOptionApi'
import colorOptionApi from 'api/colorOptionApi'
import UpdateOptionForm from '../components/UpdateOptionForm'

const contentMode = {
	addForm: 'addForm',
	updateForm: 'updateForm',
}

function OptionDetailPage() {
	const [optionData, setOptionData] = useState(null)
	const [modalContent, setModalContent] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const { productId } = useParams()
	const { loading, data, refetchData } = useProductDetail(productId)

	const { data: ramList } = useFetchData(ramOptionApi.getAll)
	const ramOptionList = useMemo(() => {
		return ramList.map(item => ({
			value: item.id,
			label: item.name,
		}))
	}, [ramList])

	const { data: romList } = useFetchData(romOptionApi.getAll)
	const romOptionList = useMemo(() => {
		return romList.map(item => ({
			value: item.id,
			label: item.name,
		}))
	}, [romList])

	const { data: colorList } = useFetchData(colorOptionApi.getAll)
	const colorOptionList = useMemo(() => {
		return colorList.map(item => ({
			value: item.id,
			label: item.name,
		}))
	}, [colorList])

	const productOptionList = useMemo(() => {
		if (!data) return []
		return data.product_options.map(item => ({
			...item,
			key: item.id,
			option_name: `${item.ram_name} - ${item.rom_name} - ${item.color_name}`,
		}))
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
			await Promise.all(idList.map(id => productApi.deleteProductOption(id)))
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
				text: 'Một số cấu hình không thể xóa được do đã có dữ liệu!',
				icon: 'error',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
		}
	}

	const handleAddOptionSubmit = async data => {
		try {
			await sleep(1000)
			const response = await productApi.addProductOption({
				...data,
				product_id: productId,
			})
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
			const response = await productApi.updateProductOption(data)
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
					<AddOptionForm
						onSubmit={handleAddOptionSubmit}
						ramOptionList={ramOptionList}
						romOptionList={romOptionList}
						colorOptionList={colorOptionList}
					/>
				)}

				{modalContent === contentMode.updateForm && (
					<UpdateOptionForm
						data={optionData}
						onSubmit={handleUpdateOptionSubmit}
						ramOptionList={ramOptionList}
						romOptionList={romOptionList}
						colorOptionList={colorOptionList}
					/>
				)}
			</Modal>

			<OptionTable
				loading={loading}
				data={productOptionList}
				onAddOption={handleAddOption}
				onUpdateOption={handleUpdateOption}
				onDeleteOption={handleDeleteOption}
			/>
		</>
	)
}

export default OptionDetailPage

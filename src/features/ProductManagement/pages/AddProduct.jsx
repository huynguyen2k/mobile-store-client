import productApi from 'api/productApi'
import React from 'react'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import AddProductForm from '../components/AddProductForm'

function AddProductPage() {
	const handleAddProduct = async data => {
		try {
			await sleep(1000)
			const response = await productApi.add(data)
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
		<>
			<AddProductForm onSubmit={handleAddProduct} />
		</>
	)
}

export default AddProductPage

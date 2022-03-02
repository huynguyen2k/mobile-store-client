import productApi from 'api/productApi'
import useProductDetail from 'hooks/useProductDetail'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import UpdateProductForm from '../components/UpdateProductForm'

function UpdateProductPage() {
	const { productId } = useParams()
	const { data } = useProductDetail(productId)
	const navigate = useNavigate()

	const handleUpdateProduct = async data => {
		try {
			await sleep(1000)
			const response = await productApi.update(data)
			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
			navigate('/admin/product/product-list')
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

	if (!data) return null
	return (
		<>
			<UpdateProductForm data={data} onSubmit={handleUpdateProduct} />
		</>
	)
}

export default UpdateProductPage

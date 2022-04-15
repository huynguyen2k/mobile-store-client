import { notification } from 'antd'
import productApi from 'api/productApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import ProductTable from '../components/ProductTable'

function ProductListPage() {
	const user = useSelector(state => state.auth.user)

	const {
		loading,
		data: productList,
		refetchData: refetchProductList,
	} = useFetchData(productApi.getAll)

	const productTableData = useMemo(() => {
		return productList.map(item => ({ ...item, key: item.id }))
	}, [productList])

	const handleChangePublicStatus = async data => {
		try {
			const response = await productApi.updateProductStatus(data)
			notification.success({
				message: response.message,
			})
			refetchProductList()
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteProduct = async idList => {
		try {
			await sleep(1000)
			await Promise.all(idList.map(id => productApi.delete(id)))
			await Swal.fire({
				title: 'Thông báo!',
				text: 'Bạn đã xóa thành công!',
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
			refetchProductList()
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
			<ProductTable
				user={user}
				loading={loading}
				data={productTableData}
				onChangePublicStatus={handleChangePublicStatus}
				onDeleteProduct={handleDeleteProduct}
			/>
		</>
	)
}

export default ProductListPage

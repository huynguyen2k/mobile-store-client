import userApi from 'api/userApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo } from 'react'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import CustomerTable from '../components/CustomerTable'

function CustomerPage() {
	const { loading, data, refetchData } = useFetchData(userApi.getAllCustomer)

	const customerList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	const handleDeleteCustomer = async idList => {
		try {
			await sleep(1000)
			await Promise.all(idList.map(id => userApi.delete(id)))
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

	return (
		<>
			<CustomerTable
				loading={loading}
				data={customerList}
				onDeleteCustomer={handleDeleteCustomer}
			/>
		</>
	)
}

export default CustomerPage

import ratingApi from 'api/ratingApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo } from 'react'
import Swal from 'sweetalert2'
import sleep from 'utils/sleep'
import RatingTable from '../components/RatingTable'

function RatingManagementPage() {
	const { loading, data, refetchData } = useFetchData(ratingApi.getAll)
	const ratingList = useMemo(() => {
		return data.map(item => ({ ...item, key: item.id }))
	}, [data])

	const handleDeleteRating = async idList => {
		try {
			await sleep(1000)
			await Promise.all(idList.map(id => ratingApi.delete(id)))
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
		<div>
			<RatingTable
				loading={loading}
				data={ratingList}
				onDelete={handleDeleteRating}
			/>
		</div>
	)
}

export default RatingManagementPage

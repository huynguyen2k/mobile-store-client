import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShopInfoForm from '../components/ShopInfoForm'
import { getShopInfo, updateShopInfo } from '../shopSlice'

function ShopInfoPage() {
	const dispatch = useDispatch()
	const shopInfo = useSelector(state => state.shop.data)

	useEffect(() => {
		;(async () => {
			try {
				await dispatch(getShopInfo()).unwrap()
			} catch (error) {
				console.log(error)
			}
		})()
	}, [dispatch])

	const handleSubmit = async data => {
		try {
			await dispatch(updateShopInfo(data)).unwrap()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<ShopInfoForm data={shopInfo} onSubmit={handleSubmit} />
		</>
	)
}

export default ShopInfoPage

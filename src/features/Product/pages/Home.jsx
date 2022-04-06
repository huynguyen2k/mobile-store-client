import bannerApi from 'api/bannerApi'
import productApi from 'api/productApi'
import useFetchData from 'hooks/useFetchData'
import React, { useCallback } from 'react'
import GridCard from '../components/GridCard'
import HeroSlider from '../components/HeroSlider'

function HomePage() {
	const { data: bannerList } = useFetchData(() => bannerApi.getAll(1))

	const getNewProductList = useCallback(() => {
		return productApi.getAll({ sort: 'newest', published: 1 })
	}, [])
	const newProduct = useFetchData(getNewProductList)

	const getPopularProductList = useCallback(() => {
		return productApi.getAll({ sort: 'default', published: 1 })
	}, [])
	const popularProduct = useFetchData(getPopularProductList)

	const getTopSellerProductList = useCallback(() => {
		return productApi.getAll({ sort: 'top-seller', published: 1 })
	}, [])
	const topSellerProduct = useFetchData(getTopSellerProductList)

	return (
		<>
			<HeroSlider data={bannerList} />

			<GridCard
				limit={8}
				loading={popularProduct.loading}
				title="Sản phẩm nổi bật nhất"
				data={popularProduct.data}
			/>

			<GridCard
				limit={8}
				loading={topSellerProduct.loading}
				title="Sản phẩm bán chạy nhất"
				data={topSellerProduct.data}
			/>

			<GridCard
				limit={8}
				loading={newProduct.loading}
				title="Sản phẩm mới nhất"
				data={newProduct.data}
			/>
		</>
	)
}

export default HomePage

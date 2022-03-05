import bannerApi from 'api/bannerApi'
import productApi from 'api/productApi'
import useFetchData from 'hooks/useFetchData'
import React from 'react'
import GridCard from '../components/GridCard'
import HeroSlider from '../components/HeroSlider'

function HomePage() {
	const { data: bannerList } = useFetchData(() => bannerApi.getAll(1))
	const { loading, data: newProductList } = useFetchData(productApi.getAll)

	return (
		<>
			<HeroSlider data={bannerList} />
			<GridCard
				limit={8}
				loading={loading}
				title="Sản phẩm mới nhất"
				data={newProductList}
			/>
			<GridCard
				limit={8}
				loading={loading}
				title="Sản phẩm bán chạy nhất"
				data={newProductList}
			/>
			<GridCard
				limit={8}
				loading={loading}
				title="Sản phẩm nổi bật nhất"
				data={newProductList}
			/>
		</>
	)
}

export default HomePage

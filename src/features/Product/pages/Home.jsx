import bannerApi from 'api/bannerApi'
import useFetchData from 'hooks/useFetchData'
import React from 'react'
import HeroSlider from '../components/HeroSlider'

function HomePage() {
	const { data: bannerList } = useFetchData(() => bannerApi.getAll(1))

	return (
		<>
			<HeroSlider data={bannerList} />
		</>
	)
}

export default HomePage

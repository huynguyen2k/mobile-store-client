import { Col, Row } from 'antd'
import brandApi from 'api/brandApi'
import productApi from 'api/productApi'
import Container from 'components/Container'
import useFetchData from 'hooks/useFetchData'
import React, { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductFilter from '../components/ProductFilter'
import ProductList from '../components/ProductList'
import queryString from 'query-string'

function ProductPage() {
	const navigate = useNavigate()
	const location = useLocation()

	const queryParams = useMemo(() => {
		const params = queryString.parse(location.search)
		const newParams = { ...params }

		if (newParams.hasOwnProperty('brand')) {
			newParams.brand = newParams.brand.split('-').map(x => parseInt(x))
		}

		if (newParams.hasOwnProperty('rating')) {
			newParams.rating = parseInt(newParams.rating)
		}

		if (newParams.hasOwnProperty('min_price')) {
			newParams.min_price = parseInt(newParams.min_price)
		}

		if (newParams.hasOwnProperty('max_price')) {
			newParams.max_price = parseInt(newParams.max_price)
		}

		return newParams
	}, [location.search])

	console.log(queryParams)

	const { loading, data, refetchData } = useFetchData(productApi.getAll)

	const getBrandList = useCallback(() => brandApi.getAll(1), [])
	const { data: brandList } = useFetchData(getBrandList)
	const brandOption = useMemo(() => {
		return brandList.map(x => ({
			value: x.id,
			label: x.name,
		}))
	}, [brandList])

	const ratingOption = useMemo(() => {
		return [5, 4, 3]
	}, [])

	const handleFilterChange = newFilter => {
		if (newFilter.hasOwnProperty('brand')) {
			newFilter.brand = newFilter.brand.join('-')
		}

		const searchString = queryString.stringify(newFilter)
		navigate(`${location.pathname}?${searchString}`)
	}

	return (
		<div style={{ padding: '32px 0' }}>
			<Container>
				<Row>
					<Col flex="0 0 250px">
						<ProductFilter
							filter={queryParams}
							onFilterChange={handleFilterChange}
							brandOption={brandOption}
							ratingOption={ratingOption}
						/>
					</Col>

					<Col flex="1 0 0">
						<ProductList
							loading={loading}
							data={data}
							limitProduct={data.length}
							limitSkeleton={20}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default ProductPage

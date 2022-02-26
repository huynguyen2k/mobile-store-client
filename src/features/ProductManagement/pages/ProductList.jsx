import productApi from 'api/productApi'
import useFetchData from 'hooks/useFetchData'
import React, { useMemo } from 'react'
import ProductTable from '../components/ProductTable'

function ProductListPage() {
	const {
		loading,
		data: productList,
		refetchData: refetchProductList,
	} = useFetchData(productApi.getAll)

	const productTableData = useMemo(() => {
		return productList.map(item => ({ ...item, key: item.id }))
	}, [productList])

	return (
		<>
			<ProductTable loading={loading} data={productTableData} />
		</>
	)
}

export default ProductListPage

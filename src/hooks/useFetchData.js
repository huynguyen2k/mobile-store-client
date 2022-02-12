import { useEffect, useState } from 'react'

function useFetchData(callback) {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		setLoading(true)
		let isMounted = true

		;(async () => {
			try {
				const response = await callback()
				isMounted && setData(response.content)
			} catch (error) {
				console.log(error)
			} finally {
				isMounted && setLoading(false)
			}
		})()

		return () => {
			isMounted = false
		}
	}, [callback])

	return { loading, data }
}

export default useFetchData

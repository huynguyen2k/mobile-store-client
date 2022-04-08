import React, { useState, useEffect } from 'react'
import LineChart from '../components/LineChart'
import StatisticList from '../components/StatisticList'
import statisticApi from 'api/statisticApi'

function StatisticAdminPage() {
	const [statistic, setStatistic] = useState(null)

	useEffect(() => {
		let mounted = true

		;(async () => {
			try {
				const response = await statisticApi.getAll()
				if (mounted) {
					setStatistic(response.content)
				}
			} catch (error) {
				console.log(error)
			}
		})()

		return () => {
			mounted = false
		}
	}, [])

	return (
		<div>
			<StatisticList data={statistic} />
			<LineChart />
		</div>
	)
}

export default StatisticAdminPage

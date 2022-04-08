import React, { useEffect, useMemo, useState } from 'react'
import './style.scss'
import 'chart.js/auto'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import statisticApi from 'api/statisticApi'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Biểu đồ doanh thu',
		},
	},
}

const labels = [
	'Tháng 1',
	'Tháng 2',
	'Tháng 3',
	'Tháng 4',
	'Tháng 5',
	'Tháng 6',
	'Tháng 7',
	'Tháng 8',
	'Tháng 9',
	'Tháng 10',
	'Tháng 11',
	'Tháng 12',
]

function LineChart() {
	const [priceList, setPriceList] = useState([])

	const data = {
		labels,
		datasets: [
			{
				label: 'Doanh thu',
				data: priceList,
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	}

	const monthList = useMemo(() => {
		const result = []
		const firstDayOfYear = moment().startOf('year')

		for (let i = 0; i <= 11; i++) {
			const currentMonth = firstDayOfYear.clone().add(i, 'months')
			const startDayOfMonth = currentMonth
				.startOf('month')
				.format('YYYY-MM-DD HH:mm:ss')
			const endDayOfMonth = currentMonth
				.endOf('month')
				.format('YYYY-MM-DD HH:mm:ss')

			result.push({
				start: startDayOfMonth,
				end: endDayOfMonth,
			})
		}

		return result
	}, [])

	useEffect(() => {
		;(async () => {
			try {
				const response = await Promise.all(
					monthList.map(
						x =>
							new Promise(async (resolve, reject) => {
								try {
									const response = await statisticApi.getTotalPrice(x)
									resolve(response.content)
								} catch (error) {
									reject(error)
								}
							})
					)
				)
				setPriceList(response)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [monthList])

	return <Line options={options} data={data} style={{ marginTop: 32 }} />
}

export default LineChart

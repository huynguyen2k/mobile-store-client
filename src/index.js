import { notification } from 'antd'
import 'antd/dist/antd.css'
import store from 'app/store'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ScrollToTop from 'components/ScrollToTop'

notification.config({
	maxCount: 3,
})

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<ScrollToTop />
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

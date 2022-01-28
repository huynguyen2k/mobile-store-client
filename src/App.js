import LoginPage from 'features/Auth/pages/Login'
import AuthLayout from 'layout/Auth'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div className="app">
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<LoginPage />} />
					{/* <Route path="/register" element={} /> */}
				</Route>
			</Routes>
		</div>
	)
}

export default App

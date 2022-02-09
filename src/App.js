import NotFound from 'components/NotFound'
import LoginPage from 'features/Auth/pages/Login'
import RegisterPage from 'features/Auth/pages/Register'
import CustomerPage from 'features/UserManagement/pages/Customer'
import StaffPage from 'features/UserManagement/pages/Staff'
import AdminLayout from 'layout/Admin'
import AuthLayout from 'layout/Auth'
import { Outlet, Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div className="app">
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Route>

				<Route path="/admin" element={<AdminLayout />}>
					<Route path="user" element={<Outlet />}>
						<Route path="staff" element={<StaffPage />} />
						<Route path="customer" element={<CustomerPage />} />
					</Route>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App

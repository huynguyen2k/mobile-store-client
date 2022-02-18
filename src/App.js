import NotFound from 'components/NotFound'
import LoginPage from 'features/Auth/pages/Login'
import RegisterPage from 'features/Auth/pages/Register'
import ColorOptionPage from 'features/ProductConfiguration/pages/ColorOption'
import RamOptionPage from 'features/ProductConfiguration/pages/RamOption'
import RomOptionPage from 'features/ProductConfiguration/pages/RomOption'
import BrandPage from 'features/ProductManagement/pages/Brand'
import CustomerPage from 'features/UserManagement/pages/Customer'
import StaffPage from 'features/UserManagement/pages/Staff'
import BannerPage from 'features/BannerManagement/pages/Banner'
import AdminLayout from 'layout/Admin'
import AuthLayout from 'layout/Auth'
import { Outlet, Route, Routes } from 'react-router-dom'
import SupplierPage from 'features/SupplierManagement/pages/Supplier'

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

					<Route path="product" element={<Outlet />}>
						<Route path="brand" element={<BrandPage />} />
					</Route>

					<Route path="product-configuration" element={<Outlet />}>
						<Route path="ram" element={<RamOptionPage />} />
						<Route path="rom" element={<RomOptionPage />} />
						<Route path="color" element={<ColorOptionPage />} />
					</Route>

					<Route path="banner" element={<BannerPage />} />
					<Route path="supplier" element={<SupplierPage />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App

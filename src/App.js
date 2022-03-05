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
import ShopInfoPage from 'features/ShopManagement/pages/ShopInfo'
import AddProductPage from 'features/ProductManagement/pages/AddProduct'
import ProductListPage from 'features/ProductManagement/pages/ProductList'
import OptionListPage from 'features/ProductManagement/pages/OptionDetail'
import ProductDetailPage from 'features/ProductManagement/pages/ProductDetail'
import UpdateProductPage from 'features/ProductManagement/pages/UpdateProduct'
import AddReceiptPage from 'features/WarehouseManagement/pages/AddReceipt'
import ReceiptListPage from 'features/WarehouseManagement/pages/ReceiptList'
import ReceiptDetailPage from 'features/WarehouseManagement/pages/ReceiptDetail'
import CustomerLayout from 'layout/Customer'
import HomePage from 'features/Product/pages/Home'
import DetailPage from 'features/Product/pages/ProductDetail'

function App() {
	return (
		<div className="app">
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Route>

				<Route path="/" element={<CustomerLayout />}>
					<Route index element={<HomePage />} />
					<Route path="product-detail/:productId" element={<DetailPage />} />
				</Route>

				<Route path="/admin" element={<AdminLayout />}>
					<Route path="user" element={<Outlet />}>
						<Route path="staff" element={<StaffPage />} />
						<Route path="customer" element={<CustomerPage />} />
					</Route>

					<Route path="product" element={<Outlet />}>
						<Route path="brand" element={<BrandPage />} />
						<Route path="add-product" element={<AddProductPage />} />
						<Route
							path="update-product/:productId"
							element={<UpdateProductPage />}
						/>
						<Route path="product-list" element={<ProductListPage />} />
						<Route
							path="product-detail/:productId"
							element={<ProductDetailPage />}
						/>
						<Route
							path="option-detail/:productId"
							element={<OptionListPage />}
						/>
					</Route>

					<Route path="product-configuration" element={<Outlet />}>
						<Route path="ram" element={<RamOptionPage />} />
						<Route path="rom" element={<RomOptionPage />} />
						<Route path="color" element={<ColorOptionPage />} />
					</Route>

					<Route path="warehouse" element={<Outlet />}>
						<Route path="add-receipt" element={<AddReceiptPage />} />
						<Route path="receipt-list" element={<ReceiptListPage />} />
						<Route
							path="receipt-detail/:receiptId"
							element={<ReceiptDetailPage />}
						/>
					</Route>

					<Route path="banner" element={<BannerPage />} />
					<Route path="supplier" element={<SupplierPage />} />
					<Route path="shop-info" element={<ShopInfoPage />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App

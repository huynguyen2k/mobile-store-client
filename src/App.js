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
import CouponsPage from 'features/CouponsManagement/pages/Coupons'
import NotificationPage from 'features/NotificationManagement/pages/Notification'
import CustomerNotificationPage from 'features/CustomerAccount/pages/Notification'
import Container from 'components/Container'
import RequireAuth from 'components/RequireAuth'
import AccountPage from 'features/CustomerAccount/pages/Account'
import AddressPage from 'features/CustomerAccount/pages/Address'
import CartPage from 'features/Cart/pages/cart'
import OrderPage from 'features/CustomerAccount/pages/Order'
import OrderManagementPage from 'features/OrderManagement/pages/Order'
import OrderDetailPage from 'features/OrderManagement/pages/OrderDetail'
import RatingManagementPage from 'features/RatingManagement/pages/RatingManagement'
import ProductPage from 'features/Product/pages/Product'
import StatisticAdminPage from 'features/StatisticManagement/pages/StatisticAdmin'
import SalesmanLayout from 'layout/Salesman'
import WarehouseManagerLayout from 'layout/WarehouseManager'

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
					<Route path="product" element={<ProductPage />} />
					<Route path="product-detail/:productId" element={<DetailPage />} />

					<Route
						path="customer"
						element={
							<RequireAuth>
								<Container>
									<Outlet />
								</Container>
							</RequireAuth>
						}
					>
						<Route path="account" element={<AccountPage />} />
						<Route path="notification" element={<CustomerNotificationPage />} />
						<Route path="address" element={<AddressPage />} />
						<Route path="cart" element={<CartPage />} />
						<Route path="order" element={<OrderPage />} />
						<Route
							path="order/:orderId"
							element={
								<div style={{ padding: '48px 0' }}>
									<OrderDetailPage />
								</div>
							}
						/>
					</Route>
				</Route>

				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<StatisticAdminPage />} />

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

					<Route path="supplier" element={<SupplierPage />} />
					<Route path="order" element={<OrderManagementPage />} />
					<Route path="order/:orderId" element={<OrderDetailPage />} />
					<Route path="banner" element={<BannerPage />} />
					<Route path="coupons" element={<CouponsPage />} />
					<Route path="notification" element={<NotificationPage />} />
					<Route path="rating" element={<RatingManagementPage />} />
					<Route path="shop-info" element={<ShopInfoPage />} />
				</Route>

				<Route path="/salesman" element={<SalesmanLayout />}>
					<Route path="order" element={<OrderManagementPage />} />
					<Route path="order/:orderId" element={<OrderDetailPage />} />
					<Route path="customer" element={<CustomerPage />} />
					<Route path="coupons" element={<CouponsPage />} />
					<Route path="notification" element={<NotificationPage />} />
					<Route path="rating" element={<RatingManagementPage />} />
				</Route>

				<Route path="/warehouse-manager" element={<WarehouseManagerLayout />}>
					<Route path="supplier" element={<SupplierPage />} />

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
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App

import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/Auth/authSlice'
import shopReducer from 'features/ShopManagement/shopSlice'
import customerReducer from 'features/CustomerAccount/customerSlice'
import cartReducer from 'features/Cart/cartSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		shop: shopReducer,
		customer: customerReducer,
		cart: cartReducer,
	},
})

export default store

import { configureStore } from '@reduxjs/toolkit'
import authSlice from 'features/Auth/authSlice'
import shopSlice from 'features/ShopManagement/shopSlice'
import customerSlice from 'features/CustomerAccount/customerSlice'

const store = configureStore({
	reducer: {
		auth: authSlice,
		shop: shopSlice,
		customer: customerSlice,
	},
})

export default store

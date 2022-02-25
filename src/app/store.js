import { configureStore } from '@reduxjs/toolkit'
import authSlice from 'features/Auth/authSlice'
import shopSlice from 'features/ShopManagement/shopSlice'

const store = configureStore({
	reducer: {
		auth: authSlice,
		shop: shopSlice,
	},
})

export default store

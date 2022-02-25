import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import shopApi from 'api/shopApi'

export const getShopInfo = createAsyncThunk(
	'shop/getShopInfo',
	async (payload, thunkAPI) => {
		try {
			const response = await shopApi.get()
			return response.content
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const updateShopInfo = createAsyncThunk(
	'shop/updateShopInfo',
	async (payload, thunkAPI) => {
		try {
			await shopApi.update(payload)
			await thunkAPI.dispatch(getShopInfo()).unwrap()
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

const shopSlice = createSlice({
	name: 'shop',
	initialState: {
		data: null,
	},
	reducers: {},
	extraReducers: {
		[getShopInfo.fulfilled]: (state, action) => {
			state.data = action.payload
		},
	},
})

const { reducer } = shopSlice

export default reducer

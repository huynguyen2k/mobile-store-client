import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import addressApi from 'api/addressApi'
import notificationApi from 'api/notificationApi'

export const getCustomerNotification = createAsyncThunk(
	'customer/getCustomerNotification',
	async (payload, thunkAPI) => {
		try {
			const { content } = await notificationApi.getCustomerNotification(payload)
			return {
				list: content,
				unreadNumber: content.reduce((total, x) => total + !x.readStatus, 0),
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const markRead = createAsyncThunk(
	'customer/markRead',
	async (payload, thunkAPI) => {
		try {
			await notificationApi.markRead(payload)
			await thunkAPI.dispatch(getCustomerNotification(payload.user_id)).unwrap()
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const getAddressList = createAsyncThunk(
	'customer/getAddressList',
	async (payload, thunkAPI) => {
		try {
			const response = await addressApi.getAll(payload)
			return response.content
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const addAddress = createAsyncThunk(
	'customer/addAddress',
	async (payload, thunkAPI) => {
		try {
			const response = await addressApi.add(payload)
			await thunkAPI.dispatch(getAddressList(payload.user_id)).unwrap()

			return response
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const updateAddress = createAsyncThunk(
	'customer/updateAddress',
	async (payload, thunkAPI) => {
		try {
			const response = await addressApi.update(payload)
			await thunkAPI.dispatch(getAddressList(payload.user_id)).unwrap()

			return response
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const deleteAddress = createAsyncThunk(
	'customer/deleteAddress',
	async (payload, thunkAPI) => {
		try {
			const response = await addressApi.delete(payload.id)
			await thunkAPI.dispatch(getAddressList(payload.user_id)).unwrap()

			return response
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

const customerSlice = createSlice({
	name: 'customer',
	initialState: {
		notification: null,
		addressList: [],
	},
	reducers: {},
	extraReducers: {
		[getCustomerNotification.fulfilled]: (state, action) => {
			state.notification = action.payload
		},
		[getAddressList.fulfilled]: (state, action) => {
			state.addressList = action.payload
		},
	},
})

const { reducer } = customerSlice
export default reducer

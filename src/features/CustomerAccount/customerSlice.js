import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

const customerSlice = createSlice({
	name: 'customer',
	initialState: {
		notification: null,
	},
	reducers: {},
	extraReducers: {
		[getCustomerNotification.fulfilled]: (state, action) => {
			state.notification = action.payload
		},
	},
})

const { reducer } = customerSlice
export default reducer

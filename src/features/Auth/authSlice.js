import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from 'api/userApi'
import sleep from 'utils/sleep'

export const login = createAsyncThunk(
	'auth/login',
	async (payload, thunkAPI) => {
		try {
			await sleep(1000)

			const response = await userApi.login(payload)
			const { user, accessToken } = response.content

			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('user', JSON.stringify(user))

			return user
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: JSON.parse(localStorage.getItem('user')),
		loggedIn: !!localStorage.getItem('user'),
	},
	reducers: {},
	extraReducers: {
		[login.fulfilled](state, action) {
			state.user = action.payload
			state.loggedIn = true
		},
	},
})

const { reducer } = authSlice

export default reducer

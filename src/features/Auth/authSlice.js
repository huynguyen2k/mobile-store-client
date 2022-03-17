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

export const update = createAsyncThunk(
	'auth/update',
	async (payload, thunkAPI) => {
		try {
			await sleep(1000)

			const response = await userApi.update(payload)
			localStorage.setItem('user', JSON.stringify(response.content))

			return response.content
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const register = createAsyncThunk(
	'auth/register',
	async (payload, thunkAPI) => {
		try {
			await sleep(1000)
			const response = await userApi.register(payload)

			return response
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
	reducers: {
		logout(state, action) {
			localStorage.removeItem('user')
			localStorage.removeItem('accessToken')

			state.user = null
			state.loggedIn = false
		},
	},
	extraReducers: {
		[login.fulfilled]: (state, action) => {
			state.user = action.payload
			state.loggedIn = true
		},

		[update.fulfilled]: (state, action) => {
			state.user = action.payload
		},
	},
})

const { reducer, actions } = authSlice
export const { logout } = actions

export default reducer

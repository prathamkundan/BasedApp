import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authHelper from "./authHelper";

const userdat = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: userdat ? userdat : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const login = createAsyncThunk (
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authHelper.login(user);
        } catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authHelper.logout();
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authHelper.register(user);
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                register.pending, (state) => { state.isLoading = true }
            )
            .addCase(
                register.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.isSuccess = true
                    state.isLoading = false
                }
            )
            .addCase(
                register.rejected, (state, action) => {
                    state.user = null
                    state.isError = true
                    state.isLoading = false
                    state.message = action.payload
                }
            )
            .addCase(
                logout.fulfilled, (state) => {
                    state.user = null
                }
            )
            .addCase(
                login.pending, (state) => { state.isLoading = true }
            )
            .addCase(
                login.fulfilled, (state, action) => {
                    state.user = action.payload
                    state.isSuccess = true
                    state.isLoading = false
                }
            )
            .addCase(
                login.rejected, (state, action) => {
                    state.user = null
                    state.isError = true
                    state.isLoading = false
                    state.message = action.payload
                }
            )
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer
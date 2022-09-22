import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        _id: null,
        first_name: null,
        last_name: null,
        username: null,
        email: null,
        avatar: null,
        errorMessage: null,
    },
    reducers: {
        login: ( state, { payload } ) => {
            state.status = "authenticated"
            state._id = payload._id
            state.first_name = payload.first_name
            state.last_name = payload.last_name
            state.username = payload.username
            state.email = payload.email
            state.avatar = payload.avatar
            state.errorMessage = null
        },
        logout: ( state, { payload } ) => {
            state.status = "not-authenticated"
            state._id = null
            state.first_name = null
            state.last_name = null
            state.username = null
            state.email = null
            state.avatar = null
            state.errorMessage = payload?.errorMessage
        },
        checkingCredentials: ( state, action ) => {
            state.status = 'checking'
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
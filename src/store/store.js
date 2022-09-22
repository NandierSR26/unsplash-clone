import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { picturesSlice } from './pictures/picturesSlice'
import { uiSlice } from './ui/uiSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        pictures: picturesSlice.reducer,
        ui: uiSlice.reducer
    }
})
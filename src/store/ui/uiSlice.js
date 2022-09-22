import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        headerOptions: false,
        modalOpen: false
    },
    reducers: {
        onShowHeaderOptions: (state) => {
            state.headerOptions = true
        },
        onHideHeaderOptions: (state) => {
            state.headerOptions = false
        },
        onOpenModal: (state) => {
            state.modalOpen = true
        },
        onCloseModal: (state) => {
            state.modalOpen = false
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onShowHeaderOptions,
    onHideHeaderOptions,
    onOpenModal,
    onCloseModal,
} = uiSlice.actions;
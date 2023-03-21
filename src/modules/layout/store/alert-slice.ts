import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Alert {
    type: string,
    text: string,
    isShow: boolean
}

const initialState: Alert = {
    type: '',
    text: '',
    isShow: false,
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert(state: Alert, action: PayloadAction<{type: string, text: string}>) {
            state.isShow = true
            state.type = action.payload.type
            state.text = action.payload.text
        },
        hideAlert(state: Alert) {
            state.isShow = false
            state.type = ''
            state.text = ''
        }
    },
})

export const alertReducer = alertSlice.reducer

export const {showAlert, hideAlert} = alertSlice.actions
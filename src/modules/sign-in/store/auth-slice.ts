import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkAuthorization, signIn } from './action-creators'; 
import { User } from "../../../types/user";

interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload
        }
    },
    extraReducers: {  //это для Thunk
        [signIn.pending.type]: (state: AuthState) => {
            state.loading = true
        },
        [signIn.fulfilled.type]: (state: AuthState, action: PayloadAction<User | null>) => {
            state.user = action.payload
            state.loading = false
            state.error = null
        },
        [signIn.rejected.type]: (state: AuthState, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        },
        
        [checkAuthorization.pending.type]: (state: AuthState) => {
            state.loading = true
        },
        [checkAuthorization.fulfilled.type]: (state: AuthState, action: PayloadAction<User | null>) => {
            state.user = action.payload
            state.loading = false
            state.error = null
        },
        [checkAuthorization.rejected.type]: (state: AuthState, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const authReducer =  authSlice.reducer;

export const {setUser} = authSlice.actions
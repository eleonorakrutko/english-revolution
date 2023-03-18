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
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state) => {
            state.loading = true
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.user = action.payload
            state.loading = false
            state.error = null
        },
        [signIn.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        },
        [checkAuthorization.pending.type]: (state) => {
            state.loading = true
        },
        [checkAuthorization.fulfilled.type]: (state, action) => {
            state.user = action.payload
            state.loading = false
            state.error = null
        },
        [checkAuthorization.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const authReducer =  authSlice.reducer;

export const {setUser, setLoading} = authSlice.actions
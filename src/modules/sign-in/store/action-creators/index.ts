import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CookiesService from "../../../../services/cookie-service";

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (credentials: {email: string, password: string}, thunkAPI) => {                     
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/sign-in`, credentials)
            CookiesService.setAuthorizationToken(response.data.token)
            return response.data.user;
        } catch (e) {
            return thunkAPI.rejectWithValue("Authorization error")
        }
    }
)

export const checkAuthorization = createAsyncThunk(
    'auth/check',
    async (_, thunkAPI) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth`, {
                headers: {
                    Authorization: `Bearer ${CookiesService.getAuthorizationToken()}`
                }
            })
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Check authorization error")
        }
    }
)
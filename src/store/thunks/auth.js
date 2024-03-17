import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "../../helper";
import { getAuth, signUp } from "../../services";


export const getAuthThunk = createAsyncThunk(
    "auth/getauth",
    async (data, { rejectWithValue }) => {
        try {
            const response = await getAuth(data);
            setCookie("token", response.data.token, 7);
            return Promise.resolve(response.data);
        } catch (error) {

            return rejectWithValue(error.response);
        }
    }
);

export const signUpThunk = createAsyncThunk(
    "signup/signup",
    async (data, { rejectWithValue }) => {
        try {
            const response = await signUp(data);            
            return Promise.resolve(response.data);

        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);
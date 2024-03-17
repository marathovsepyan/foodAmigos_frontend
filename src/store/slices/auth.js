import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "../../helper";
import { getAuthThunk, signUpThunk } from "../thunks/auth";

const initialState = {
    success: false,
    regMessage: "",
    statusCode: 0,
    statusName: "",
    loading: false,
    token: getCookie("token"),
    errors:[],
    message:''
  };
  export const AuthSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      adminLogout: (state) => {
        deleteCookie("token", "");
        state.token = "";
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getAuthThunk.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(
        getAuthThunk.fulfilled,
        (state, { payload }) => {
          state.success = true;
          state.token = payload.data.token;
          state.loading = false;          
        }
      );
      builder.addCase(getAuthThunk.rejected, (state, { payload }) => {  
        state.errors = payload;
        state.success = false;
        state.loading = false;
      });

      builder.addCase(signUpThunk.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(
        signUpThunk.fulfilled,
        (state, { payload }) => {
          state.success = true;         
          state.loading = false;
          state.regMessage = "Your are successfully signed up!!!"
        }
      );
      builder.addCase(signUpThunk.rejected, (state, { payload }) => {  
        console.log(payload,"pa")
        state.message = payload.data.message;
        state.success = false;
        state.loading = false;
      });
    },
  });
  
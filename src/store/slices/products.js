import { createSlice } from "@reduxjs/toolkit";
import { getProductsThunk } from "../thunks/products";

const initialState = {
    success: false,
    message: "",
    errors: [],
    statusCode: 0,
    statusName: "",
    loading: false,
    products: []    
  };

  export const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getProductsThunk.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(
            getProductsThunk.fulfilled,
          (state, { payload }) => {        
            state.success = true;
            state.loading = false;
            state.products = payload.data;        
            state.isCreated = false;
            state.isDeleted = false;
            state.isUpdated = false;
          }
        );
        builder.addCase(getProductsThunk.rejected, (state, { payload }) => {
          state.errors = payload ? payload.errors || [] : [];
          state.success = false;
          state.loading = false;
        });     
     },
     
  })
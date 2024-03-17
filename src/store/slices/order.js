import { createSlice } from "@reduxjs/toolkit";

import { createBasketThunk, deleteBasketThunk, getBasketsThunk, updateBasketThunk } from "../thunks/baskets";
import { createOrdersThunk, getOrdersThunk } from "../thunks/orders";

const initialState = {
    success: false,
    message: "",
    errors: [],
    statusCode: 0,
    statusName: "",
    loading: false,
    orders: [],
    isUpdated:false,
    isOrderCreated:false
     
  };

  export const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getOrdersThunk.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(
          getOrdersThunk.fulfilled,
          (state, { payload }) => {              
            state.success = true;
            state.loading = false;
            state.orders = payload.data;        
            state.isCreated = false;
            state.isDeleted = false;
            state.isUpdated = false;
          }
        );
        builder.addCase(getOrdersThunk.rejected, (state, { payload }) => {
          state.errors = payload ? payload.errors || [] : [];
          state.success = false;
          state.loading = false;
        });   
        
        

       
        builder.addCase(createOrdersThunk.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(
          createOrdersThunk.fulfilled,
          (state, { payload }) => {              
            state.success = true;
            state.loading = false;
            state.isOrderCreated=true;
            // state.orders = payload.data;        
            state.isCreated = false;
            state.isDeleted = false;           
          }
        );
        builder.addCase(createOrdersThunk.rejected, (state, { payload }) => {
          state.errors = payload ? payload.errors || [] : [];
          state.success = false;
          state.loading = false;
        });  


       
     },
     
  })
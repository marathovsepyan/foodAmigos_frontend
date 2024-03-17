import { createSlice } from "@reduxjs/toolkit";

import { createBasketThunk, deleteBasketThunk, getBasketsThunk, updateBasketThunk } from "../thunks/baskets";

const initialState = {
    success: false,
    message: "",
    errors: [],
    statusCode: 0,
    statusName: "",
    loading: false,
    basketList: [],
    isUpdated:false,
    isAdded:false
     
  };

  export const BasketsSlice = createSlice({
    name: "baskets",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getBasketsThunk.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(
            getBasketsThunk.fulfilled,
          (state, { payload }) => {              
            state.success = true;
            state.loading = false;
            state.basketList = payload.data;        
            state.isCreated = false;
            state.isAdded=false;
            state.isDeleted = false;
            state.isUpdated = false;
          }
        );
        builder.addCase(getBasketsThunk.rejected, (state, { payload }) => {
          state.errors = payload ? payload.errors || [] : [];
          state.success = false;
          state.loading = false;
        });   
        
        

        builder.addCase(updateBasketThunk.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(
          updateBasketThunk.fulfilled,
          (state, { payload }) => {              
            state.success = true;
            state.loading = false;
            state.isUpdated=true;
            state.isAdded=false;
            // state.basketList = payload.data;        
            state.isCreated = false;
            state.isDeleted = false;           
          }
        );
        builder.addCase(updateBasketThunk.rejected, (state, { payload }) => {
          state.errors = payload ? payload.errors || [] : [];
          state.success = false;
          state.loading = false;
        });   



        builder.addCase(createBasketThunk.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(
          createBasketThunk.fulfilled,
          (state, { payload }) => {              
            state.success = true;
            state.loading = false;
            state.isAdded=true;
            // state.basketList = payload.data;        
            state.isCreated = false;
            state.isDeleted = false;           
          }
        );
        builder.addCase(createBasketThunk.rejected, (state, { payload }) => {
          state.errors = payload ? payload.errors || [] : [];
          state.success = false;
          state.loading = false;
        });  


        builder.addCase(deleteBasketThunk.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(
          deleteBasketThunk.fulfilled,
          (state, { payload }) => {              
            state.success = true;
            state.loading = false;
            state.isAdded=false;
            // state.basketList = payload.data;        
            state.isCreated = false;
            state.isDeleted = true;           
          }
        );
        builder.addCase(deleteBasketThunk.rejected, (state, { payload }) => {
          state.errors = payload ? payload.errors || [] : [];
          state.success = false;
          state.loading = false;
        });  
     },
     
  })
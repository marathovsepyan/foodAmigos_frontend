import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../services";

export const getProductsThunk = createAsyncThunk(
    "products/getProducts",
    async (_, { rejectWithValue }) => {
      try {
        const response = await getProducts();         
        return Promise.resolve(response.data);
      } catch (error) {        
        return rejectWithValue(error.response.data);
      }
    }
  );
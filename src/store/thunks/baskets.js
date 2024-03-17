import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBaskets, deleteBasket, getBaskets, updateBasket } from "../../services";


export const getBasketsThunk = createAsyncThunk(
  "baskekts/getbaskets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBaskets();
      return Promise.resolve(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBasketThunk = createAsyncThunk(
  "basket/updatebaskets",
  async (data, { rejectWithValue }) => {
    console.log(data, "ddddr")
    try {
      const response = await updateBasket(data);
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error, "eeee")
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBasketThunk = createAsyncThunk(
  "basket/createbaskets",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addBaskets(data);
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error, "eeee")
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteBasketThunk = createAsyncThunk(
  "basket/deletebaskets",
  async (data, { rejectWithValue }) => {
    try {
      const response = await deleteBasket(data);
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error, "eeee")
      return rejectWithValue(error.response.data);
    }
  }
);
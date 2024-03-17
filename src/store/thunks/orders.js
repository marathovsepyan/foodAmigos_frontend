import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getOrders } from "../../services";


export const createOrdersThunk = createAsyncThunk(
  "orders/createorders",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createOrder(data);
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error, "eeee")
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOrdersThunk = createAsyncThunk(
  "orders/getorders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrders();
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error, "eeee")
      return rejectWithValue(error.response.data);
    }
  }
);


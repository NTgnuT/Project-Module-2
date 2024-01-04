import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrder = createAsyncThunk("getOrder", async () => {
  const response = await axios.get(`http://localhost:3000/order`);
  return response.data;
});

export const deleteOrder = createAsyncThunk("deleteOrder", async (id) => {
  await axios.delete(`http://localhost:3000/order/${id}`);
  return id;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    mess: "no mess",
    isLoadingGet: false,
    isLoadingChange: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingGet: true,
        };
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getOrder.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingGet: false,
        };
      })
      // delete
      .addCase(deleteOrder.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingChange: true,
        };
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke",
          isLoadingChange: false,
        };
      })
      .addCase(deleteOrder.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingChange: false,
        };
      });
  },
});

export default orderSlice.reducer;

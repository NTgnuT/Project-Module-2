import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("getProduct", async (searchText) => {
  if (searchText !== undefined) {
    const response = await axios.get(
      `http://localhost:3000/products?product_name_like=${searchText}`
    );
    return response.data;
  } else {
    const response = await axios.get(`http://localhost:3000/products`);
    return response.data;
  }
});

export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
  await axios.delete(`http://localhost:3000/products/${id}`);
  return id;
});

export const addProduct = createAsyncThunk("addProduct", async (data) => {
  await axios.post(`http://localhost:3000/products`, data);
  return data;
});

export const updateProduct = createAsyncThunk("updateProduct", async (pro) => {
  const { id, ...data } = pro;
  console.log("id: ", id, "data: ", data);
  await axios.put(`http://localhost:3000/products/${pro.id}`, data);
  return pro;
});

const productSlide = createSlice({
  name: "product",
  initialState: {
    data: [],
    mess: "no mess",
    isLoadingGet: false,
    isLoadingChange: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingGet: true,
        };
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getProduct.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingGet: false,
        };
      })
      // delete
      .addCase(deleteProduct.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingChange: true,
        };
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke",
          isLoadingChange: false,
        };
      })
      .addCase(deleteProduct.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingChange: false,
        };
      })
      // add
      .addCase(addProduct.pending, (state) => {
        return {
          ...state,
          mess: "pending add",
          isLoadingChange: true,
        };
      })
      .addCase(addProduct.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke add",
          isLoadingChange: false,
        };
      })
      .addCase(addProduct.rejected, (state) => {
        return {
          ...state,
          mess: "no add",
          isLoadingChange: false,
        };
      })
      // update
      .addCase(updateProduct.pending, (state) => {
        return {
          ...state,
          mess: "pending update",
          isLoadingChange: true,
        };
      })
      .addCase(updateProduct.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke update",
          isLoadingChange: false,
        };
      })
      .addCase(updateProduct.rejected, (state) => {
        return {
          ...state,
          mess: "no update",
          isLoadingChange: false,
        };
      });
  },
});

export default productSlide.reducer;

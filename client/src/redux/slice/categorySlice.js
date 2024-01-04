import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk(
  "getCategory",
  async (searchText) => {
    if (searchText !== undefined) {
      const response = await axios.get(
        `http://localhost:3000/categories?category_name_like=${searchText}`
      );
      return response.data;
    } else {
      const response = await axios.get(`http://localhost:3000/categories`);
      return response.data;
    }
  }
);

export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {
  await axios.delete(`http://localhost:3000/categories/${id}`);
  return id;
});

export const addCategory = createAsyncThunk("addCategory", async (data) => {
  await axios.post(`http://localhost:3000/categories`, data);
  return data;
});

export const updateCatagory = createAsyncThunk(
  "updateCategory",
  async (cate) => {
    const { id, ...data } = cate;
    console.log("id: ", id, "data: ", data);
    await axios.put(`http://localhost:3000/categories/${cate.id}`, data);
    return cate;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    mess: "no mess",
    isLoadingGet: false,
    isLoadingChange: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingGet: true,
        };
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getCategory.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingGet: false,
        };
      })
      // delete
      .addCase(deleteCategory.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingChange: true,
        };
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke",
          isLoadingChange: false,
        };
      })
      .addCase(deleteCategory.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingChange: false,
        };
      })
      // add
      .addCase(addCategory.pending, (state) => {
        return {
          ...state,
          mess: "pending add",
          isLoadingChange: true,
        };
      })
      .addCase(addCategory.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke add",
          isLoadingChange: false,
        };
      })
      .addCase(addCategory.rejected, (state) => {
        return {
          ...state,
          mess: "no add",
          isLoadingChange: false,
        };
      })
      // update
      .addCase(updateCatagory.pending, (state) => {
        return {
          ...state,
          mess: "pending update",
          isLoadingChange: true,
        };
      })
      .addCase(updateCatagory.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke update",
          isLoadingChange: false,
        };
      })
      .addCase(updateCatagory.rejected, (state) => {
        return {
          ...state,
          mess: "no update",
          isLoadingChange: false,
        };
      });
  },
});

export default categorySlice.reducer;

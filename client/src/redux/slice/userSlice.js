import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getInfoUserLogin = createAsyncThunk(
  "getInfoUserLogin",
  async (id) => {
    const res = await axios.get(`http://localhost:3000/users/${id}`);
    return res.data;
  }
);

export const getUser = createAsyncThunk("getUser", async (searchText) => {
  if (searchText !== undefined) {
    const response = await axios.get(
      `http://localhost:3000/users?user_name_like=${searchText}`
    );
    return response.data;
  } else {
    const response = await axios.get(`http://localhost:3000/users`);
    return response.data;
  }
});

export const changeActiveUser = createAsyncThunk(
  "changeActiveUser",
  async (user) => {
    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      active: !user.active,
    });
    return user.id;
  }
);

export const updateUser = createAsyncThunk("updateUser", async (user) => {
  const { id, ...data } = user;
  // console.log("id: ", id, "data: ", data);
  await axios.put(`http://localhost:3000/users/${user.id}`, data);
  return user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    mess: "no mess",
    isLoadingGet: false,
    isLoadingChange: false,
    infoUserLogin: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingGet: true,
        };
      })
      .addCase(getUser.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getUser.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingGet: false,
        };
      })
      .addCase(changeActiveUser.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingChange: true,
        };
      })
      .addCase(changeActiveUser.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke",
          isLoadingChange: false,
        };
      })
      .addCase(changeActiveUser.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingChange: false,
        };
      })
      // update
      .addCase(updateUser.pending, (state) => {
        return {
          ...state,
          mess: "pending update",
          isLoadingChange: true,
        };
      })
      .addCase(updateUser.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke update",
          isLoadingChange: false,
        };
      })
      .addCase(updateUser.rejected, (state) => {
        return {
          ...state,
          mess: "no update",
          isLoadingChange: false,
        };
      })
      .addCase(getInfoUserLogin.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "oke update",
          infoUserLogin: action.payload,
        };
      });
  },
});

export default userSlice.reducer;

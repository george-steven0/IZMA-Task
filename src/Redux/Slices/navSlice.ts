import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  HttpError,
  navListItem,
  navListProps,
  trackValues,
} from "../../Types/types";

export const getNavList = createAsyncThunk(
  "getNavListFunc",
  async (_, { rejectWithValue }) => {
    const url = `/nav`;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: unknown) {
      const httpError = error as HttpError;

      if (httpError.response && httpError.response.data) {
        console.log(httpError.response.data);
      }
      return rejectWithValue(httpError?.response?.data);
    }
  }
);

export const updateNav = createAsyncThunk(
  "updateNavFunc",
  async (values: navListItem[], { rejectWithValue }) => {
    console.log(values);

    const url = `/nav`;
    try {
      const res = await axios.post(url, values);
      return res.data;
    } catch (error: unknown) {
      const httpError = error as HttpError;

      if (httpError.response && httpError.response.data) {
        console.log(httpError.response.data);
      }
      return rejectWithValue(httpError?.response?.data);
    }
  }
);

export const track = createAsyncThunk(
  "trackFunc",
  async (values: trackValues, { rejectWithValue }) => {
    const url = `/track`;
    try {
      const res = await axios.post(url, values);
      return res.data;
    } catch (error: unknown) {
      const httpError = error as HttpError;

      if (httpError.response && httpError.response.data) {
        console.log(httpError.response.data);
      }
      return rejectWithValue(httpError?.response?.data);
    }
  }
);

const initialState: navListProps = {
  loading: false,
  navlist: [],
  openNav: false,
  errors: {},
};
export const NavbarSlice = createSlice({
  name: "Navbar Slice",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateNavList: (state, action: PayloadAction<any[]>) => {
      state.navlist = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openSideNav: (state, action) => {
      state.openNav = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNavList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNavList.fulfilled, (state, action) => {
        state.loading = false;
        state.navlist = action?.payload;
      })
      .addCase(getNavList.rejected, (state, action) => {
        state.loading = false;
        state.navlist = [];
        state.errors = action?.payload ? action?.payload : "";
      })

      .addCase(updateNav.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNav.fulfilled, (state, action) => {
        state.loading = false;
        // state.navlist = action?.payload;
        console.log(action?.payload);
      })
      .addCase(updateNav.rejected, (state, action) => {
        state.loading = false;
        // state.navlist = [];
        console.log(action?.payload);

        state.errors = action?.payload ? action?.payload : "";
      })

      .addCase(track.pending, (state) => {
        state.loading = true;
      })
      .addCase(track.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(track.rejected, (state, action) => {
        state.loading = false;
        state.errors = action?.payload ? action?.payload : "";
      });
  },
});

export const { updateNavList, openSideNav } = NavbarSlice.actions;

export default NavbarSlice.reducer;

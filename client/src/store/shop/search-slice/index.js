import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchResults = createAsyncThunk(
  "/order/getSearchResults",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/shop/search/${keyword}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch search results");
    }
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.searchResults = [];
        console.error("Search request failed:", action.payload);
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/shop/review/add`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/shop/review/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch reviews");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        console.error("Error fetching reviews:", action.payload);
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload.data);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Error adding review:", action.payload);
      });
  },
});

export default reviewSlice.reducer;

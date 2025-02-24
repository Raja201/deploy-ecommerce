import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/common/getFeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/common/feature/get`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch feature images");
    }
  }
);

export const addFeatureImage = createAsyncThunk(
  "/common/addFeatureImage",
  async (image, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/common/feature/add`, { image });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add feature image");
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.featureImageList = [];
        console.error("Feature Image Fetch Error:", action.payload);
      })
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList.push(action.payload.data);
      })
      .addCase(addFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Feature Image Add Error:", action.payload);
      });
  },
});

export default commonSlice.reducer;

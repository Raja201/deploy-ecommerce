import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${BASE_URL}/api/admin/products/add`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding product");
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${BASE_URL}/api/admin/products/get`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching products");
    }
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await axios.put(`${BASE_URL}/api/admin/products/edit/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error editing product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${BASE_URL}/api/admin/products/delete/${id}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting product");
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        console.error(action.payload); // Log error
      })
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList.push(action.payload.data);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.payload);
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the product list after edit
        state.productList = state.productList.map((product) =>
          product.id === action.payload.data.id ? action.payload.data : product
        );
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted product from the list
        state.productList = state.productList.filter((product) => product.id !== action.meta.arg);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.payload);
      });
  },
});

export default AdminProductsSlice.reducer;

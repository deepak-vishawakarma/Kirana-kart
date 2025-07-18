import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get("https://kirana-kart.onrender.com/api/product/data");
  return res.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const res = await axios.get("http://localhost:5500/api/Categories/data");
  return res.data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default categorySlice.reducer;

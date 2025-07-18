import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './ProductSlice.js';
import CategoryReducer from './CategorySlice.js';

const store = configureStore({
  reducer: {
    products: ProductReducer,
    categories: CategoryReducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './categories/categoriesSlice';
import productsSlice from './products/productsSlice';
import { apiSlice } from './api/apiSlice';
import userSlice from './userSlice/userSlice';

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getMiddleWare) => getMiddleWare().concat(apiSlice.middleware),
    devTools: true,
});
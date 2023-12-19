import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from './../../utils/constants';

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL}/categories`);
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err);
        }

    }
);


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.list = payload;
        });
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

export default categoriesSlice.reducer;
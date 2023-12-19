import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from './../../utils/constants';
import { shuffle } from "../../utils/common";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL}/products`);
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err);
        }

    }
);


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        filtered: [],
        related: [],
        isLoading: false
    },
    reducers: {
        filterByPrice: (state, { payload }) => {
            // payload = 100; 100 = argument of dispatch in <Home/>
            // {payload} === action.payload
            // {price} === action.payload.price
            state.filtered = state.list.filter(({ price }) => {
                return price < payload;
            })
        },
        getRelatedProducts: (state, action) => {
            const list = state.list.filter(({ category: { id } }) => {
                return id === action.payload;
            });
            state.related = shuffle(list);
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.list = payload;
        });
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
        })
    }
});


export const { filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;
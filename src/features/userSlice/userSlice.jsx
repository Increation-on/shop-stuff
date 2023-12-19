import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from './../../utils/constants';
import axios from 'axios';

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/users`, payload);
            // const data = await response.json();
            // return data;
            return response.data;

        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err);
        }

    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload, thunkAPI) => {
        // console.log(payload)
        try {
            const response = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
            // const data = await response.json();
            // return data;
            return response.data;

        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue({ message: err.message, status: err.response.status });
        }

    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, payload);
            const login = await axios(`${BASE_URL}/auth/profile`, {
                headers: {
                    "Authorization": `Bearer ${response.data.access_token}`
                }
            })
            return login.data;

        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err);
        }

    }
);

const addCurrentUser = (state, { payload }) => {
    state.currentUser = payload;
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        cart: [],
        formType: "signup",
        showForm: false,
        isLoading: false
    },
    reducers: {
        // const { payload, type} = action;
        addItemToCart: (state, action) => {
            let newCart = [...state.cart];
            // const { id, title, price } = state.cart[0];
            const found = state.cart.find(({ id }) => {
                // console.log(state.cart[0].id);
                return id === action.payload.id;
            });
            if (found) {
                newCart = newCart.map((item) => {
                    return item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity || item.quantity + 1 }
                        : item;
                });
            } else newCart.push({ ...action.payload, quantity: 1 });
            state.cart = newCart;
        },
        removeItemFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(({ id }) => { return id !== payload })
        },
        toggleForm: (state, { payload }) => {
            state.showForm = payload;
        },
        toggleFormType: (state, { payload }) => {
            state.formType = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, addCurrentUser);
        builder.addCase(loginUser.fulfilled, addCurrentUser);
        builder.addCase(updateUser.fulfilled, addCurrentUser);
    }
});


export const { addItemToCart, toggleForm, toggleFormType, removeItemFromCart } = userSlice.actions;

export default userSlice.reducer;
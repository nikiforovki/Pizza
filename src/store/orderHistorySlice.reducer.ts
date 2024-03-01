// orderHistorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: []
};

const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        }
    }
});

export const { addOrder } = orderHistorySlice.actions;

export default orderHistorySlice.reducer;




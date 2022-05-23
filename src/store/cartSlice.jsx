import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    item: [],
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItem: (state, action) => {
            state.item.push(action.payload)
        },
        removeItem: (state, action) => {
            state.item = state.item.filter(state.item.id !== action.payload.id)
        },
       deleteItem: (state) => {
            state.countItemCart =  []
        },
    },
})

export const {setItem ,removeItem, deleteItem} = cartSlice.actions

export default cartSlice.reducer
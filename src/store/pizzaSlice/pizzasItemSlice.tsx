import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IPizza, IPizzasItemSlice, Status} from "./types";
import {fetchPizzaItems} from "./asyncAction";



const initialState:IPizzasItemSlice = {
    items: [],
    status: Status.LOADING,
}


export const pizzasItemSlice = createSlice({
    name: 'pizzaItem',
    initialState,
    reducers: {
        setItem: (state, action:PayloadAction<IPizza[]>) => {
            state.items = action.payload


        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzaItems.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzaItems.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.items = action.payload
        })

        builder.addCase(fetchPizzaItems.rejected, (state, action) => {
            state.status = Status.ERROR
            state.items = []
        })
    }
})


export default pizzasItemSlice.reducer
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


export const fetchPizzaItems = createAsyncThunk(
    'pizzaItem/fetchPizzaItems',
    async (params) => {
        const {
            sortType,
            order,
            category,
            search,
            currentPage,
        } = params;
        const { data } = await axios.get(
            `https://628169519fac04c654050e3b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`)
        return data
    }
)

const initialState = {
    items: [],
    status:'',
}


export const pizzasItemSlice = createSlice({
    name: 'pizzaItem',
    initialState,
    reducers: {
        setItem: (state, action) => {
            state.items = action.payload

        }
    },
    extraReducers:{
        [fetchPizzaItems.pending]:(state)=> {
            state.status = 'loading'
            state.items = []

        },
        [fetchPizzaItems.fulfilled]:(state,action) => {
            state.status = 'success'
            state.items = action.payload

        },
        [fetchPizzaItems.rejected]:(state) => {
            state.status = 'error'
            state.items = []
        }
    }
})
export const selectPizzaItems = (state) => state.pizzaItem

export const {setItem} = pizzasItemSlice.actions

export default pizzasItemSlice.reducer
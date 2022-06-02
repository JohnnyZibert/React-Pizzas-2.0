import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";



export interface ISearchPizzaParams {
    sortBy:string,
    order:string,
    category:string,
    search:string,
    currentPage:string,
}

interface IPizza {
    id: string,
    title: string,
    price: number,
    sizes: number[],
    types: number[],
    imageUrl: string,
}
export enum Status {
    LOADING= 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface IPizzasItemSlice {
    items: IPizza[],
    status: Status,
}

const initialState:IPizzasItemSlice = {
    items: [],
    status: Status.LOADING,
}


export const fetchPizzaItems = createAsyncThunk<IPizza[],ISearchPizzaParams>(
    'pizzaItem/fetchPizzaItems',
    async (params) => {
        const {
            sortBy,
            order,
            category,
            search,
            currentPage,
        } = params;

        const {data} = await axios.get<IPizza[]>(
            `https://628169519fac04c654050e3b.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data


    }
)


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
export const selectPizzaItems = (state: RootState) => state.pizzaItem

export default pizzasItemSlice.reducer
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPizza, ISearchPizzaParams} from "./types";
import axios from "axios";

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



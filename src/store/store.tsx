import {configureStore} from '@reduxjs/toolkit'
import filterReducer from './filter/FilterSlice'
import cartReducer from './cart/CartSlice'
import pizzaItemReducer from './pizzaSlice/pizzasItemSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizzaItem: pizzaItemReducer,
    }

})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
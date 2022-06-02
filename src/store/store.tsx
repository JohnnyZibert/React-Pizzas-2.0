import {configureStore} from '@reduxjs/toolkit'
import filterReducer from './slice/filterSlice'
import cartReducer from './slice/cartSlice'
import pizzaItemReducer from './slice/pizzasItemSlice'
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
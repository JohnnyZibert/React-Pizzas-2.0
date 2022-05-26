import {configureStore} from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import cartReducer from './cartSlice'
import pizzaItemReducer from './pizzasItemSlice'

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizzaItem:pizzaItemReducer,
    }

})
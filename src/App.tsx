import React from 'react';
import './scss/app.scss';
import HomePage from "./Page/HomePage.tsx";
import Cart from "./components/Cart.tsx";
import EmptyCart from "./components/EmptyCart.tsx";
import {Route, Routes} from 'react-router-dom'
import NotFound from "./components/NotFound/NotFound.tsx";
import FullPizza from "./Page/FullPizza.tsx";
import MainLayout from "./layout/layoutPizza.tsx";


export const App = () => {

    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='' element={<HomePage/>}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path='emptyCart' element={<EmptyCart/>}/>
                <Route path='pizza/:id' element={<FullPizza/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>

    );
}


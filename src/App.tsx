
import './scss/app.scss';
import HomePage from "./Page/HomePage";
import Cart from "./components/Cart";
import EmptyCart from "./components/EmptyCart";
import {Route, Routes} from 'react-router-dom'
import NotFound from "./components/NotFound/NotFound";
import FullPizza from "./Page/FullPizza";
import MainLayout from "./layout/layoutPizza";
import * as React from "react";


export const App:React.FC = () => {

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


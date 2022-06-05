import './scss/app.scss';
import HomePage from "./Page/HomePage";
import {Route, Routes} from 'react-router-dom'
import Index from "./Page/NotFound";
import MainLayout from "./layout/layoutPizza";
import * as React from "react";
import {Suspense} from 'react';

const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart'*/'./Page/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: 'FullPizza'*/'./Page/FullPizza'));
const EmptyCart = React.lazy(() => import(/*webpackChunkName: 'EmptyCart'*/'./Page/EmptyCart'));

export const App: React.FC = () => {


    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='' element={<HomePage/>}/>
                <Route path='cart' element={
                    <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                        <Cart/>
                    </Suspense>}/>
                <Route path='emptyCart' element={
                    <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                        <EmptyCart/>
                    </Suspense>}/>
                <Route path='pizza/:id' element={<Suspense fallback={<div>Идёт загрузка пицц...</div>}>
                    <FullPizza/>
                </Suspense>}/>
                <Route path='*' element={<Index/>}/>
            </Route>
        </Routes>

    );
}


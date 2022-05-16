import React from 'react';
import './scss/app.scss';
import Header from "./components/Header";

import HomePage from "./Page/HomePage";
import Cart from "./components/Cart";
import EmptyCart from "./components/EmptyCart";
import {Route,Routes} from 'react-router-dom'
import NotFound from "./components/NotFound/NotFound";


function App() {

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/emptyCart' element={<EmptyCart/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

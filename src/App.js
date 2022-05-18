import React from 'react';
import './scss/app.scss';
import Header from "./components/Header";

import HomePage from "./Page/HomePage";
import Cart from "./components/Cart";
import EmptyCart from "./components/EmptyCart";
import {Route,Routes} from 'react-router-dom'
import NotFound from "./components/NotFound/NotFound";


function App() {
    const [searchValue, setSearchValue] = React.useState('')

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                <Routes>
                    <Route path='/' element={<HomePage searchValue={searchValue}/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/emptyCart' element={<EmptyCart/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

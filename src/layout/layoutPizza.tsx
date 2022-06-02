import Header from "../components/Header";

import { Outlet } from 'react-router-dom';
import * as React from "react";

const MainLayout:React.FC = () => {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}
export default MainLayout
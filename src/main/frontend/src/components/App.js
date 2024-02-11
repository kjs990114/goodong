import React from 'react';
import {Fragment} from "react";
import '../styles/App.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import UserRepo from "../pages/UserRepo";
import {Route, Routes} from "react-router-dom";
function App() {
    return (
        <Fragment>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/repository'} element={<UserRepo/>} />
            </Routes>
            <Footer/>
        </Fragment>
    );
}

export default App;

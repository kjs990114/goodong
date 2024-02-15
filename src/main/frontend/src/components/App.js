import React from 'react';
import {Fragment} from "react";
import '../styles/App.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import {Route, Routes} from "react-router-dom";
import CreateRepo from "../pages/Repository/CreateRepo";
import UserRepo from "../pages/Repository/UserRepo";
function App() {
    return (
        <Fragment>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/repository'} element={<UserRepo/>} />
                <Route path={'/repository/create'} element={<CreateRepo/>}/>
            </Routes>
            <Footer/>
        </Fragment>
    );
}

export default App;

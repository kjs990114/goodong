import React from 'react';
import {Fragment} from "react";
import '../styles/App.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

function App() {
    return (
        <Fragment>
            <Header/>
            <Main/>
            <Footer/>
        </Fragment>
    );
};

export default App;

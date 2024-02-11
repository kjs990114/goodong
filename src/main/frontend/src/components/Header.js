import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './RegisterForm';
import LoginForm from "./LoginForm";
import '../styles/header.css';
import {Link} from "react-router-dom";

const Header = () => {
    const [loginModal, setLoginModal] = useState(false);
    const showLoginModal = () => {setLoginModal(true);};
    const hideLoginModal = () => {setLoginModal(false);};

    const [registerModal, setRegisterModal] = useState(false);
    const showRegisterModal = () => {setRegisterModal(true);};
    const hideRegisterModal = () => {setRegisterModal(false);};

    const [isLogin, setIsLogin] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        const username = localStorage.getItem('username');
        if (storedToken) {
            setIsLogin(true);
            setId(username);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsLogin(false);
        setId("");
    }

    return(
        <div id={"header-frame"}>
            <Link to={"/"}>
                <button className={"button"} id={"home-button"}>Home</button>
            </Link>
            {!isLogin && (
                <span id = {"regi-span"}>
                    <button className={"button"} id={"signin-button"} onClick={showLoginModal}>Sign in</button>
                    <button className={"button"} id={"create-account-button"} onClick={showRegisterModal}>Create account</button>
                </span>
            )}
            {isLogin && id !== "" &&(
                <span id={"user-span"}>
                    <span className={"user-info"} id={"user-info-text"}>{id} 님 반갑습니다!</span>
                    <Link to={"/repository"}>
                        <button className={"button"} id={"my-repository-button"}>My Repository</button>
                    </Link>
                    <button className={"button"} id={"logout-button"} onClick={logout}>Logout</button>
                </span>
            )}
            <Modal show ={registerModal} onHide = {hideRegisterModal}>
                <Modal.Body>
                    <RegisterForm/>
                </Modal.Body>
            </Modal>

            <Modal show ={loginModal} onHide = {hideLoginModal}>
                <Modal.Body>
                    <LoginForm setLoginModal={setLoginModal} setIsLogin = {setIsLogin} setId = {setId}/>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Header;
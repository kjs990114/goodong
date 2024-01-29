import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './RegisterForm';
import LoginForm from "./LoginForm";

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

        <div>
            {!isLogin && (
                <>
                    <button onClick={showLoginModal}>Sign in</button>
                    <button onClick={showRegisterModal}>Create account</button>
                </>
            )}
            {isLogin && id !== "" &&(
                <div>
                    <span>{id} 님 반갑습니다!</span>
                    <button onClick={logout}>Logout</button>

                </div>
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
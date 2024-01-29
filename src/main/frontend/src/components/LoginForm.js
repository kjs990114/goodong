import React, {useEffect, useState} from 'react';
import axios from "axios";

const SUCCESS = "Login Success!";
const FAIL = "Login Failed";
const LoginForm = ({setLoginModal, setIsLogin, setId}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const login = () => {
        if (!username.trim() || !password.trim()) { return; }

        axios.post(
            'http://localhost:8000/login',
            { username, password },
            { headers: { 'Content-Type': 'application/json' } } // Content-Type을 명시적으로 설정
        )
            .then(response => {
                setMsg(SUCCESS);
                const token = response.headers.getAuthorization();
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('username',username);
                if (token) {
                    setLoginModal(false);
                    setIsLogin(true);
                    setId(username);
                }


            })
            .catch(e =>{
                setMsg(FAIL);
            });
    };
    return(
        <div>
        {msg !== SUCCESS &&(
            <>
                <input name={"username"} type={"email"} placeholder={"Email"} value={username} onChange={ (e) => setUsername(e.target.value)}/>
                <input name={"password"} type={"password"} placeholder={"Password"} value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button onClick={login}> Login</button>
            </>
        )}
        {msg != "" && msg !== SUCCESS && (
            <div style={{ color: 'red' }}>
                <span>{msg}</span>
            </div>
        )}
        {msg === SUCCESS && (
            <>
                <span>{msg}</span>
            </>
        )}
        </div>

    )
}

export default LoginForm;

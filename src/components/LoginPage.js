// This is where we enter into fields and make an API fetch with the data.
// More insight at the Authentication-Demo file.
// https://github.com/FullstackAcademy/2301-FTB-MT-WEB-FT/blob/main/Phase-2-Frontend/Wk-6/Feb-28/authentication-demo/src/components/RegisterForm.js
import React from 'react';
import {useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import RegisterPage from './RegisterPage';

// Because the login page links to the Register page, I need it.
// Pass props here later, think you'll need it.
const LoginPage = () => {
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const COHORT_NAME ='2301-ftb-mt-web-ft';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

    async function login(event) {
        event.preventDefault();
        
        try {
            if(enteredUsername.length < 5){
                alert("Username must be greater than (5) characters long")
                return;
            } else if (enteredPassword.length < 5) {
                alert("Password must be greater than (5) characters long")
                return;
            };
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: "POST",
                headers: {
                    // "Content-Type": "applications/json",
                    "Content-Type": "application/json",
                    // CORS-ERROR-FIX:
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                },
                body: JSON.stringify({
                    user: {
                        username: enteredUsername,
                        password: enteredPassword
                    }
                })
            });
            const translatedData = await response.json();

            if(!translatedData.success){
                console.log("Login unsuccessful!")
                alert("Login unsuccessful.");
            } else {
                const tokenKey = translatedData.data.token;
                console.log(tokenKey);
                localStorage.setItem("token", tokenKey);
                alert("Logged in. Redirecting...");
                setLoginUser("");
                setLoginPass("");
                goHome("/");
            }
        } catch(error){
            console.log(error);
        }
    }
    
    return (
        <div className="loginContainer">
            <h1 className = "pageTitle">Log in!</h1>
            {/* <SubmitDog/> */}
            {/* Maybe something like THIS is how I view API data... */}
            {/* <Roster dogData = {props.something}/> */}

            <form onSubmit={login} className="loginForm">
                <input
                    type="text"
                    placeholder="Username"
                    value={enteredUsername}
                    onChange={(event) => setEnteredUsername(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={enteredPassword}
                    onChange={(event) => setEnteredPassword(event.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            
            <Link to="/register">Register</Link>
        </div>
    )
}

export default LoginPage;
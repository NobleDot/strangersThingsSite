import React from 'react';
import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const COHORT_NAME ='2301-ftb-mt-web-ft';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    
    const goHome = useNavigate();

    async function testCallback(event) {
        event.preventDefault();

        try {
            console.log("Our new username is: " + newUsername)
            console.log("Our new password is: " + newPassword)

            // Check password length
            // But this is pretty weaksauce honestly
            if (newPassword.length < 8) {
                alert("Password must be at least 8 characters long!")
                return;
            } else if (newUsername.length < 8) {
                alert("Username must be at least 8 characters long!");
                return; 
            }


            const response = await fetch(`${BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    // I don't know where I got this chunk below from..
                    // "Content-Type": "application/json",
                    // // CORS-ERROR-FIX:
                    // "Access-Control-Allow-Origin": "*",
                    // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    // "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"


                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: newUsername,
                        password: newPassword
                    },
                })
            })

            const translatedData = await response.json(); 
            console.log(translatedData)

            if (!translatedData.success) {
                console.log("Account was not successfully created. Please try again!");
                alert("Account was not successfully created. Please try again!")
            } else {
                const myJWT = translatedData.data.token;
                console.log("My JWT is: " + myJWT);
                localStorage.setItem("token", myJWT);
                alert("New account registered. Enjoy!");
                setNewUsername("")
                setNewPassword("")

                // How to add something to localStorage? 
                    // Skeleton Syntax: localStorage.setItem(nameOfTheKey, valueForThatKey)
                    // Note: the name of the key argument MUST BE a string.
                localStorage.setItem("token", myJWT)

                // Step 5e:
                goHome("/")
            }
        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <div className = "registerContainer">
            <h3> Sign Up!</h3>
            <form onSubmit={testCallback} className="loginForm">
                <input
                    type="text"
                    placeholder="Username"
                    value={newUsername}
                    onChange={(event) => setNewUsername(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;
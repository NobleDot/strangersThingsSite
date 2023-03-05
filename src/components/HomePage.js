import React from 'react';
import {useState, useEffect } from "react";

let value = "No one"

// Pass props here later, think you'll need it.
const HomePage = (props) => {
    const [myData, setMyData] = useState({});

    // WRite a useEffect.
    useEffect(() => {
        console.log(localStorage.getItem("token"))
        if (localStorage.getItem("token")) {

            props.setIsLoggedIn(true);

            fetchMyData();
        } else {
            props.setIsLoggedIn(false);
            console.log("No token exists!");
        }

        async function fetchMyData() {
            try {
                const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/me", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                        // idk why she wrote this
                        // Authoization: "Bearer" + localStorage.getItem("token");
                    }
                })

                const translatedData = await response.json();

                console.log("Below is our personal acount data:")
                console.log(translatedData)
                setMyData(translatedData.data)
            } catch (error) {
                console.log(error);
            }
        }
    }, [])
    // ^ tf is that for?
    
    return (
        <div className="homeContainer">
            <h1 className = "pageTitle">Stranger's Things!</h1>
            { props.isLoggedIn ? <h3>Welcome, {myData.username}</h3> : <h3>Please login or register for a new account!</h3> }
            <div className = "profileButton">VIEW PROFILE </div>
        </div>
    )
}

export default HomePage;
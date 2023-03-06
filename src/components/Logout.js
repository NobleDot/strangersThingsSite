import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
    // const { loggedin, setIsLoggedIn} = props;
    const { isLoggedIn} = props
    const goHome = useNavigate();

    localStorage.removeItem('token');
    props.setIsLoggedIn(false);

    // useEffect(() => {

    //     // uh, just gonna leave this here for a hard reset of token.
    //     localStorage.removeItem("token");
        
    //     if (props.setLoggedIn(true)) {
    //         localStorage.removeItem("token");
    //         console.log("Removed token!");

    //         // Well, we should set it back to loggedIN being false, right?
    //         // props.setLoggedIn(false);
    //         goHome("/");
    //     } else {
    //         props.setLoggedIn(false);
    //         console.log("setLoggedIn was not true. I set it to false. Maybe no Token exist.");
    //     }
    //     console.log("Remove the token here!");
    // }, [])

    // return (
    //     <p>We're logging out here!</p>
    // )
}

export default Logout;
import React from 'react';
import {useState, useEffect } from "react";

const ProfilePage = () => {

    const [ username, setUsername ] = useState ("");
    const [ id, setId ] = useState ("");
    const [messages, setMessages ] = useState([])

    const tokenKey = localStorage.getItem("token");

    const COHORT_NAME ='2301-ftb-mt-web-ft';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

    // Auth Check
    // useEffect(()=> {
    //   if (localStorage.getItem("token")){
    //       props.setLoggedIn(true);
    //       // myData();
    //   } else {
    //       props.setLoggedIn(false);
    //       console.log("No Token Exists");
    //   };
    // }, [])

    const myData = async () => {
        // console.log("Called myData");
        try {
          const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
          });
          const result = await response.json();
          setUsername(result.data.username);
          setId(result.data._id);
          setMessages(result.data.messages);
          return result
        } catch (err) {
          console.error(err);
        }
    }
  //   async function fetchData(){
  //     try {
  //         const response = await fetch(`${BASE_URL}/users/me`, {
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization' : `Bearer ${tokenKey}`,
  //             }
  //         });    
  //         const transData = await response.json();
  //         console.log(transData);
  //         console.log(transData.data);

  //         setData(transData.data);

  //         setMyPosts(transData.data.posts);
  //         setMyMess(transData.data.messages);
  //     } catch(error){
  //         console.log(error);
  //     }
  // }

    myData();
    return (
        <div className = "profileContainer">
            This is the profile page!
            <div className = "pageTitle">Welcome, {username} </div>
            <div><em> ID #{id}</em></div>
            <h2 className = "pageTitle">Messages to me:</h2>
            <div className = "messagesContainer"> This is where my messages would go</div>
            {
                    messages.length ? messages.map((oneMessage) => {
                        return (
                            <div key={oneMessage._id}>
                                <p>{oneMessage.title}</p>
                                {/* <Link to={`/${oneMessage._id}`}>  { oneMessage.title } ({ oneMessage.price })</Link> */}
                            </div>
                        )
                    }) : "Couldn't render an update, messages.length is undefined."
            }
        </div>
    )
}

export default ProfilePage;
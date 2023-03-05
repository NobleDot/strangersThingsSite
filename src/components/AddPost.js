import React from 'react';
import {useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AddPost = (props) => {
    const {setPosts, posts}  = props;

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState("");


    const COHORT_NAME = '2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

    const goHome = useNavigate();
    // Binary? Like how you evaluate if logged in at homepage!
    // const [new, setNew] = useState("");

    // const makePost = async () => -

        // try {
        //   const response = await fetch(`${BASE_URL}/posts`, {
        //     method: "POST",
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Authorization': `Bearer ${localStorage.getItem("token")}`
        //     },
        //     body: JSON.stringify({
        //       post: {
        //         title: {newTitle},
        //         description: {newDescription},
        //         price: {newPrice},
        //         location: {newLocation},
        //         willDeliver: false,
        //       }
        //     })
        //   });
        //   const result = await response.json();
        //   console.log(result);
        //   return result
        // } catch (err) {
        //   console.error(err);
        // }
    //   }

    async function testCallback2(e) {
        e.preventDefault();
        // console.log("Our new username is: " + newTitle)
        // console.log("Our new password is: " + newDescription)
        console.log("testCallback2");
        try {
            const response = await fetch(`${BASE_URL}/posts`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
              },
              body: JSON.stringify({
                // post: {
                //   title: {newTitle},
                //   description: {newDescription},
                //   price: {newPrice},
                //   location: {newLocation},
                //   willDeliver: false,
                // }
                post: {
                    title: newTitle,
                    description: newDescription,
                    price: newPrice,
                    // location: newLocation,
                    willDeliver: true,
                }
              })
            });
            const result = await response.json();

            console.log(result);
            if (!result.success) {
                alert("Couldn't create post");
            } else {
                setPosts([...posts, result.data.post])
                goHome("/posts");
            }
            console.log(result);
            return result
          } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")){
            setIsLoggedIn(true);

            // fetchAllData();

        } else {
            console.log("No token is present");
            setIsLoggedIn(false);
        }  
    }, [])

    return (
        <div className = "addPostContainer"> 
            <div className = "pageTitle">Add New Post</div>

            <form onSubmit={testCallback2} className="loginForm">
                <input
                    type="text"
                    placeholder="Title"
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(event) => setNewDescription(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={newPrice}
                    onChange={(event) => setNewPrice(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={newLocation}
                    onChange={(event) => setNewLocation(event.target.value)}
                />
                
                <label for="accept">
                    <input 
                        type="checkbox"
                        id="accept"
                        name="accept"
                        value="yes"/> Willing to Deliver?
                </label>

                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default AddPost;
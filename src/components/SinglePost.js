import React from 'react';
import {useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 

const SinglePost = (props) => {

    const { id } = useParams();
    const [newMessage, setNewMessage] = useState("");
    const [myData, setMyData] = useState({});

    const postsList = props.propPosts;
    console.log(props.propPosts);
    const chosenPost = postsList.filter((post) => {
        return post._id == id
    })
    const sendMessage = async () => {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts/${onePost._id}/messages`,
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    message: {
                        content: message
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchMyData(); 
        } else {
            props.setIsLoggedIn(false)
            console.log("No token exists!")
        }

        async function fetchMyData() {
            try {
                const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/me", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                const translatedData = await response.json(); 
                
                setMyData(translatedData.data)
            } catch (error) {
                console.log(error); 
            }
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (truePost.author._id == myData) {
            alert("You cant send a message on your post");
            return;
        }
        sendMessage();
        setNewMessage('');
    }

    
    //   console.log(useParams());

    // let filterPosts = props.propPosts.filter((onePost) => {
    //     return onePost._id == _id
    // });

   

    // const truePost = chosenPost[0];    
    return (
        <div className = "singlePostPageContainer">

            <div className = "singlePostContainer">
                {/* Print all the stuff about this post here */}

                <p>Print the post stuff here</p>

                {/* <h3>Post Details for item ({chosenPost[0]._id})</h3> */}

                <div>
                    {/* <h4>Title: {chosenPost[0].title} </h4>
                    <div>Description: {chosenPost[0].description}</div>
                    <div>Price: {chosenPost[0].price}</div>
                    <div>Created On: {chosenPost[0].createdAt}</div> */}
                </div>

                <Link to={"/posts"}><button>Back to Posts</button></Link>

            </div>

            <div className = "postOptionsContainer">
                <div className = "postDelete">
                    <p>Delete button here!</p>
                </div>
                <div className = "postEdit">
                    <p>Edit button here!</p>
                </div>
            </div>
            <div className = "commentsTitle">
                <h2> Form data here</h2>
                {/* <form onSubmit={login} className="loginForm">
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
                </form> */}
                <h2> Messages replying to this post:</h2>
            </div>
            <div className = "messagesTitle">
                <p> This is where a bunch of messages would go, I guess</p>
            </div>
        </div>   
    )
}

export default SinglePost;
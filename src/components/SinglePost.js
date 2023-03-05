import React from 'react';
import {useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; 

const SinglePost = (props) => {
    
    const { _id } = useParams();
    //   console.log(useParams());

    let filterPosts = props.propPosts.filter((onePost) => {
        return onePost._id == _id
    });
    console.log(filterPosts);

    return (
        <div className = "singlePostPageContainer">

            <div className = "singlePostContainer">
                {/* Print all the stuff about this post here */}

                <p>Print the post stuff here</p>

                <h3>Post Details for item ({filterPosts[0]._id})</h3>

                <div>
                    <h4>Title: {filterPosts[0].title} </h4>
                    <div>Description: {filterPosts[0].description}</div>
                    <div>Price: {filterPosts[0].price}</div>
                    <div>Created On: {filterPosts[0].createdAt}</div>
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
                <h2> Messages replying to this post:</h2>
            </div>
            <div className = "messagesTitle">
                <p> This is where a bunch of messages would go, I guess</p>
            </div>
        </div>
        
    )
}

export default SinglePost;
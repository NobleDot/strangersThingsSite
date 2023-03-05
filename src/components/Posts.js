import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


    
// async function fetchAllPosts() {
//     try {
//         const response = await fetch(`${BASE_URL}/posts`)

//         const result = await response.json();
//         console.log(result);
//         return result
//     } catch (err) {
//         console.error(err);
//     }
// }
// useEffect(() => {
//     fetchAllPosts();
// }, [])

    // const [posts, setPosts] = useState([]);

    // Logged in status.
    // const [loggedIn, setLoggedIn] = useState(false);

    // // I'll check the API here.
    // async function fetchAllPosts() {
    //     try {
    //         const response = await fetch(`${BASE_URL}/posts`)

    //         const result = await response.json();

    //         setPosts(result.data.posts);
    //         console.log(result);
    //         return result
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    // }
    // useEffect(() => {
    //     fetchAllPosts();
    // }, [])


const Posts = (props) => {
    const [somePosts, someSetPosts] = useState([]);

    async function testCallback2(e) {
        console.log("We would search for a new post now!");
    }

    // const {things, setIsLoggedIn, setUserData, isLoggedIn, userData, setThings} = props;
    const { posts, setPosts, setUpdateState, updateState, fetchAllPosts } = props;
    const [search, setSearch] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState("");

    // const [filteredPosts, setFilterPostsByName] = useState(!filteredPosts.length ? [] : posts);

    useEffect(() => {
        console.log("I was ran in posts updateState");
        // setPosts(filteredPosts);
        fetchAllPosts();
    },[])
    
    return (
        <div className = "postsContainer">
            <div className = "pageTitle">POSTS</div>
            {/* <p> We are in POSTS</p> */}
            <div className = "postsPageNav">
                <div className = "postsSearchBar">
                    <form onSubmit={testCallback2}>
                        <input
                            type="text"
                            placeholder="Search for a post..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>

            {/* Accessibility should be dependent on if I'm logged in */}
            <Link to="/posts/add">Add a post!</Link>

            <div>
                {console.log(props.propPosts.length)}

                {
                    props.propPosts.length ? props.propPosts.map((onePost) => {
                        return (
                            <div key={onePost._id}>
                                <Link to={`/${onePost._id}`}>  { onePost.title } ({ onePost.price })</Link>
                            </div>
                        )
                    }) : "Couldn't render an update, posts.length is undefined."
                }

                {/* Could use this later? */}
            </div>
        </div>
    )
}

export default Posts;
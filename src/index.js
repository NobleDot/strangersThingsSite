// This is Source index. You render the main app.

import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { HomePage, LoginPage, Logout, RegisterPage, ProfilePage, Posts, SinglePost, AddPost} from './components'

import '../src/style.css';

// I always need this to render the Main JSX (Javascript syntax extension)

// const appElem = document.getElementById("app");
// const root = createRoot(appElem);

const COHORT_NAME = '2301-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

// havigate home 

const App = () => {

    const logout = () => {
    
        localStorage.removeItem('token');
        props.setIsLoggedIn(false);
        // havigate home 
        
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

    const [posts, setPosts] = useState([]);

    // Logged in status.
    // const [loggedIn, setLoggedIn] = useState(false);

    // I'll check the API here.
    async function fetchAllPosts() {
        try {
            const response = await fetch(`${BASE_URL}/posts`)

            const result = await response.json();

            setPosts(result.data.posts);
            console.log(result);
            return result
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchAllPosts();
    }, [])

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    return (
        <BrowserRouter>
            <p><em>Version 3.2.2023</em></p>
            <nav className="nav-bar">
                {/* <a className="nav-item" id="current-page" href="index.html">Home Page</a> */}
                <div className="nav-title"><em>Stranger's Things</em></div>
                <Link to="/" className="nav-item">Homepage</Link>
                <Link to="/posts" className="nav-item">Posts</Link>
                <Link to="/register" className="nav-item">Register</Link>
                <Link to="/profile" className="nav-item">Profile</Link>

                {   // testing ternary operations. checked 2nd thingy to damn you're logged in. used to be an empty string.
                    isLoggedIn ? (
                        <section> 
                            {/* <Link to=" /logout" className="nav-item">Logout</Link> */}
                            <button onClick={logout}> Logout</button>
                        </section>
                        )
                     : (
                        <section className = "nav-bar">
                            <Link to="/register" className="nav-item">Sign Up</Link>
                            <Link to="/login" className="nav-item">Login</Link>
                        </section>
                    )
                }
            </nav>
            
            <div>
                {/* I don't actually have a navbar, but I guess here is where it would go. */}
                {/* <NavBar isLoggedIn = {isLoggedIn} userData={userData}/> */}

                <Routes>
                    {/* <Route path="/" element={<MainOkay something={puppies}/>} /> */}
                    <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/posts" element={<Posts propPosts={posts} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} fetchAllPosts= {fetchAllPosts}/>} />
                    <Route path="/posts/add" element={<AddPost posts={posts} setPosts={setPosts}/> } fetchAllPosts= {fetchAllPosts}/>
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route path="/profile" element={<ProfilePage loggedIn={isLoggedIn}/>} />
                    <Route path="/:_id" element={<SinglePost propPosts={posts} setPosts={setPosts} fetchAllPosts= {fetchAllPosts}/>} ></Route>
                    {/* <Route path="/Logout" element={ <Logout loggedIn={loggedIn} setLoggedIn={ setLoggedIn }/> }/> */}
                </Routes>
            </div>
        </BrowserRouter>
    )
}

let appElem = document.getElementById("app");
let root = createRoot(appElem);
root.render(<App/>)
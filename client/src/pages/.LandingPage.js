import React from "react"
// import Github from "../src/images/github.png";
// import "./Home.css"
import "../Landingpage.css";
import Github from "../images/github.png"
import Navbar from "../components/Navbar.jsx";


const github = () => {
  window.open("http://localhost:3000/auth/github", "_self");
};

const LandingPage = () => {
  
    return (
      <div>
        <Navbar />
        <div className="hero-container">
         <h1>Discover Code Your Future's best photos</h1>
         <div className="loginButton github" onClick={github}>
                          <img src={Github} alt="" className="icon" />
                            Sign Up
                        </div>  
        </div>
      </div>
        
    )
}

export default LandingPage

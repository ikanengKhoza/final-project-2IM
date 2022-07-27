import React from "react";
import Github from "../images/github.png";
import "../Signup.css";
// call from client side
const github = () => {
  window.open("http://localhost:3000/auth/github", "_self");
};

function Signup() {
  return( <div className="login">
              <div className="wrapper">
                <div className="signup"> Welcome  </div>
                <div className="signup"> SignUp to discover </div>
                <div className="loginButton github" onClick={github}>
                          <img src={Github} alt="" className="icon" />
                            Sign Up
                        </div>
              </div>

          </div>
        );
}


export default Signup;
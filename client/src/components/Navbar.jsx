import React from "react";
import logo from "../pages/cyf_logo.png";
import SignIn from "../components/SignIn.jsx";



export default function Navbar() {
  return (
		<div>
			<header className="header-wrapper">
				<img className="logo-img" src={logo} alt="logo" width={"150px"} />

				<div className="">
					<SignIn />
				</div>
			</header>
		</div>
	);
}
import React, { useState } from "react";
import "../App.css";
import data from "../data.json";
import Search from "../components/Search.jsx";
//import { FaThumbsUp, FaThumbsDown, FaTrashAlt } from "react-icons/fa";
//import { IconContext } from "react-icons";
import ButtonUpload from "../components/ButtonUpload.jsx";
import ButtonSearchImage from "../components/ButtonSearchImg.jsx";
import ButtonSearchLogo from "../components/ButtonSearchLogo.jsx";
import ButtonSearchIcon from "../components/ButtonSearchIcon.jsx";
import logo from "./cyf_logo.png";

export default function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [images, setImages] = useState(data);

	//______________________search____________________
	function handleSearch(event) {
		setSearchTerm(event.target.value);

	}

	return (
		<div>
			<div className="App">
				<header className="header-wrapper mt-3">
					<img className="logo-img" src={logo} alt="logo" width={"150px"} />
					<ButtonUpload />
				</header>

				<div className="content-wrapper">
					<div className="container">
						<div className="col">
							<div className="col-md-12 search-wrapper ">
								<div className="row">
									<div className="col-md-8">
										<Search
											searchTerm={searchTerm}
											handleSearch={handleSearch}
										/>
									</div>
									<div className="col">
										<ButtonSearchImage />
									</div>
									<div className="col">
										<ButtonSearchLogo />
									</div>
									<div className="col">
										<ButtonSearchIcon />
									</div>
								</div>
							</div>

							<div className="col-md mt-3 ">
								{images.length > 0 &&
									images
										.filter(({ title }) =>
											title.toLowerCase().includes(searchTerm.toLowerCase())
										)
										.map((img) => {
											return (
												<div className="card pt-4 mb-3 " key={img.id}>
													<h3 className="video-title">{img.title}</h3>
													<br />
													<img
														className="logo-img"
														src={img.image}
														alt="logo"
														width={"150px"}
													/>
												</div>
											);
										})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
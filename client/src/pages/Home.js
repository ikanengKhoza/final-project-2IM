import React, { useState } from "react";
import "../App.css";
import data from "../data.json";
import Search from "../components/Search.jsx";
import { IconContext } from "react-icons";
import { Link } from "react";
import Upload from "../components/Upload.jsx";
import ButtonSearchImage from "../components/ButtonSearchImg.jsx";
import ButtonSearchLogo from "../components/ButtonSearchLogo.jsx";
import ButtonSearchIcon from "../components/ButtonSearchIcon.jsx";
import logo from "./cyf_logo.png";
import Navbar from "../components/Navbar.jsx";

export default function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [images, setImages] = useState(data);


	//______________________search____________________
	function handleSearch(event) {
		setSearchTerm(event.target.value);
		console.log(setImages);

	}

	return (
		<IconContext.Provider value={{ style: { fontSize: "35px" } }}>
			<div className="App">
				<Navbar />
				{/* <header className="header-wrapper mt-3">
					<img className="logo-img" src={logo} alt="logo" width={"150px"} />
					<h1 className="header-title"></h1>
					<ButtonUpload />
				</header> */}

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
								</div>
							</div>

							<div className="col-md mt-3 ">
								<div className="container">
									<div className="row">
										{images.length > 0 &&
											images
												.filter(({ title }) =>
													title.toLowerCase().includes(searchTerm.toLowerCase())
												)
												.map((img) => {
													return (
														<div className="col" key={img.id}>
															<div className="card pb-4 mt-4 mb-4">
																<br />
																<img
																	className="logo-img"
																	src={img.image}
																	alt="logo"
																	height={"180px"}
																/>
																<div className="card-body">
																	<h3 className="img-title">{img.title}</h3>
																	<p className="card-text">
																		Example text for description of the image
																	</p>
																</div>
															</div>
														</div>
													);
												})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</IconContext.Provider>
	);
}

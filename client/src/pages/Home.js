import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";
import Search from "../components/Search.jsx";
import Navbar from "../components/Navbar.jsx";

export default function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [images, setImages] = useState([]);

	//______________________fetch____________________
	useEffect(() => {
		fetch("/api/listImages", {
			mode: "cors",
		})
			.then((response) => response.json())
			.then((data) => {
				setImages(data);
			});
	}, []);

	//delete video
	const deleteImage = (id) => (e) => {
		e.preventDefault();
		fetch(`/api/image/${id}`).then(() => {
			const output = images.filter((element) => element.id !== id);
			alert("are sure you want to delete this image?");
			setImages(output);
		});
	};

	//______________________search____________________
	function handleSearch(event) {
		setSearchTerm(event.target.value);
		console.log(setImages);
	}
	return (
		<>
			<Navbar />
			<div className="app-container">
				<Box sx={{ width: 1400, height: 640 }}>
					<Search
						className="search-box"
						searchTerm={searchTerm}
						handleSearch={handleSearch}
					/>
					<ImageList variant="masonry" cols={3} gap={20}>
						{images.length > 0 &&
							images
								// .filter(({ title }) =>
								//  title.toLowerCase().includes(searchTerm.toLowerCase())
								// )
								.map((imgId) => {
									return (
										<ImageListItem key={imgId} cols={2}>
											<ListSubheader component="div">
												{imgId.description}
											</ListSubheader>
											<img
												className="logo-img"
												src={`/api/image/${imgId} ?w=248&fit=crop&auto=format`}
												srcSet={`/api/image/${imgId}?w=248&fit=crop&auto=format&dpr=2 2x`}
												alt="logo"
												height={"250px"}
											/>
											<ImageListItemBar
												title={imgId.title}
												subtitle={imgId.author}
												actionIcon={
													<IconButton
														sx={{ color: "rgba(85, 255, 255, 0.54)" }}
														aria-label={`info about ${imgId.title}`}
													>

														<DeleteIcon color="secondary" />
													</IconButton>
												}
											/>
											<div className="card-body">
												{/* <p className="card-text">
                                                                        Owner: {img.owner}
                                                                    </p>
                                                                    <p className="card-text">
                                                                        Description: {img.description}
                                                                    </p> */}
											</div>
										</ImageListItem>
									);
								})}
					</ImageList>
				</Box>
			</div>
		</>
	);
}

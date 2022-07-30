import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Navbar from "../components/Navbar.jsx";

import "../Upload.css";

function Upload() {
	const [fileData, setFileData] = useState();
	const [username, setUserName] = useState();
	const [description, setDescription] = useState();

	const navigate = useNavigate();

	const fileChangeHandler = (e) => {
		setFileData(e.target.files[0]);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		const data = new FormData();

		data.append("image", fileData);
		data.append("description", description);
		data.append("username", username);

		fetch("/api/upload", {
			method: "POST",
			body: data,
		})
			.then(() => {
				console.log("File Sent Successful");
			})
			.catch((err) => {
				console.log(err.message);
			});
		navigate("/home/this/site");
	};

	return (
		<>
			<div className="general">
				<Navbar />
			</div>
			<div className="upload">
				<form onSubmit={onSubmitHandler}>
					<label className="upload-select">
						Select
						<CloudUploadIcon size="large" />
						<input
							className="input-file "
							type="file"
							onChange={fileChangeHandler}
						/>

					</label>
                      <br></br>
					<label>
						<input

							type="text"
							placeholder="Username"
							name="username"
							onChange={(e) => setUserName(e.target.value)}
						/>
					</label>
					<br></br>
				

					<label>
						<textarea placeholder="Add Location and Description"
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</label>
					<br></br>

					<button type="submit" className="btn btn-dark">
						Upload
					</button>
				</form>
			</div>
		</>
	);
}

export default Upload;
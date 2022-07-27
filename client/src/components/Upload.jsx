import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      navigate("/");
	};

	return (
		<div className="upload">
			<form onSubmit={onSubmitHandler}>
				<label className="upload-select">
					Select
					<input type="file" onChange={fileChangeHandler} />
				</label>

				<label>
					username
					<input
						type="text"
						name="description"
						onChange={(e) => setUserName(e.target.value)}
					/>
				</label>

				<label>
					Add description and location
					<input
						type="text"
						name="description"
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>

				<button type="submit" className="btn btn-info">
					Upload
				</button>
			</form>
		</div>
	);

}

export default Upload;

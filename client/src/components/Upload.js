import { useState } from "react";
//import axios from "axios";

async function postImage({ file, description }) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("description", description);

	const result = fetch("/api/upload",  {
		method: "post",
		body: formData,
		headers: { "Content-Type": "multipart/form-data" },
	});
	return result.data;
}

function Upload() {
	const [file, setFile] = useState();
	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);

	const submit = async (event) => {
		event.preventDefault();
		const result = await postImage({ image: file, description });
		setImages([result.image, ...images]);
	};

	const fileSelected = (event) => {
		const file = event.target.files[0];
		setFile(file);
	};

	return (
		<div className="Upload">
			<form onSubmit={submit}>
				<input onChange={fileSelected} type="file" accept="upload" />
				<input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					type="text"
				/>
				<button type="submit">Submit</button>
			</form>

			{images.map((image) => (
				<div key={image}>
				</div>
			))}
		</div>
	);
}

export default Upload;

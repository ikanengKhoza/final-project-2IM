import "./Upload.css";


export function Upload() {
	function handleUploadSubmit() {
		let formData = new FormData();
		formData.append("file", Upload.files);
		formData.append("title", "title");
		formData.append("author", "author");
		fetch("http://localhost:3000/api/upload", {
			method: "POST",
			body: formData,
		});
	}
	return (
		<>
			<div className="card">
				<div className="upload-image-form">
					<h2>Upload An Image</h2>
					<form method="post" action="upload" encType="multipart/form-data">
						<label htmlFor="title">title:</label>
						<input type="text" id="title" name="title" required />
						<label htmlFor="author">author:</label>
						<input type="text" id="author" name="author" required />
						<input type="file" name="image" />

						<button
							className="btn btn-info"
							onClick={handleUploadSubmit}
							type="submit"
							name="upload"
						>
							Upload
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default Upload;

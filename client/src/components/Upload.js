
export function Upload() {
	function handleUploadSubmit(e) {
		e.preventDefault();
		let formData = new FormData();
		console.log("1st hit");
		formData.append("file", Upload.files);
		formData.append("title", "title");
		formData.append("author", "author");
		fetch("http://localhost:3000/upload", {
			method: "POST",
			mode: "no-cors",
			headers: { "Content-Type": "application/json" },
			body: formData,

		});
		console.log("2nd hitt");
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

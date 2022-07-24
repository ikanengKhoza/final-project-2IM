import React from "react";
import { useState } from "react";



function Upload() {
	const [fileData, setFileData] = useState();

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", fileData);

    fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: data,
    })
      .then(() => {
        console.log("File Sent Successful");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="upload">
      <form onSubmit={onSubmitHandler}>
        <label className="upload-select">Select
        <input type="file" onChange={fileChangeHandler} />
        </label>
        <button type="submit" className="btn btn-success">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
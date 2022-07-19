import React from "react";
import { Link } from "react-router-dom";


export default function ButtonUpload() {
  return (
    <div>
      <Link to="upload"className="btn btn-info">Upload</Link>
    </div>
  );
}

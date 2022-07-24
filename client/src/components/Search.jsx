import React, { useState } from "react";
import "../App.css";
import { FaSearch } from "react-icons/fa";


export default function Search(props) {
const [showdropdown, setShowdropdown] = useState(false);

function toggleDropdown(){
	setShowdropdown(!showdropdown);
}

  return (
		<div className="container">
			<div className="col-lg mt-3">
				<div className="search">
					<FaSearch className="search-icon" />

					<div className="search-row mb-3 search-input input-group">
						<input
							className="form-control"
							type="text"
							aria-label="Text input with dropdown button"
							placeholder="search"
							value={props.searchTerm}
							onChange={(event) => props.handleSearch(event)}
						/>
						<div className="btn-group dropdown">
							<button
								onClick={toggleDropdown}
								className="btn btn-outline-dark dropdown-toggle btn-img"
								type="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Images
							</button>
							<div className={`dropdown-menu ${showdropdown ? "show" : " "}`}>
								<a className="dropdown-item" href="#">
									photos
								</a>
								<a className="dropdown-item" href="#">
									logos
								</a>
								<a className="dropdown-item" href="#">
									icons
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


/* 
	<div className="input-group-append">
		<button
			onClick={toggleDropdown}
			className="btn btn-outline-dark dropdown-toggle"
			type="button"
			data-toggle="dropdown"
			data-bs-toggle="dropdown"
			aria-haspopup="true"
			aria-expanded="false"
		>
			Images
		</button>
		<div className={`dropdown-menu ${showdropdown ? "show" : " "}`}>
			<a className="dropdown-item" href="#">
				photos
			</a>
			<a className="dropdown-item" href="#">
				logos
			</a>
			<a className="dropdown-item" href="#">
				icons
			</a>
		</div>
	</div>; */
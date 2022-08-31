import React from "react";
import "../App.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Search(props) {
  return (
		<div className="container">
			<div className="col-lg mt-3">
				<div className="search">
					<FaSearch className="search-icon" />

					<div className="search-row mb-3 search-input input-group ">
						<input
							className="form-control home-page-search"
							type="text"
							aria-label="Text input with dropdown button"
							placeholder="search"
							value={props.searchTerm}
							onChange={(event) => props.handleSearch(event)}
						/>
						<div className="input-group-append">
							<button
								className="btn btn-outline-dark dropdown-toggle"
								type="button"
								data-toggle="dropdown"
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="true"
							>
								Images
							</button>
							<div className="dropdown-menu">
								<a className="dropdown-item" href="#">
									Action
								</a>
								<a className="dropdown-item" href="#">
									Another action
								</a>
								<a className="dropdown-item" href="#">
									Something else here
								</a>
								<div role="separator" className="dropdown-divider"></div>
								<a className="dropdown-item" href="#">
									Separated link
								</a>
							</div>
							<Link to="/upload"><button className="btn btn-dark">Upload</button></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


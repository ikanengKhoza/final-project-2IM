import React, { useState, useEffect } from "react";
import "../App.css";
//import data from "../data.json";


import Search from "../components/Search.jsx";
import { IconContext } from "react-icons";
import { Link } from "react";
import logo from "./cyf_logo.png";
import Navbar from "../components/Navbar.jsx";
export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [images, setImages] = useState([]);
    //______________________fetch____________________
    useEffect(() => {
        fetch("http://localhost:3000/api/listImages", {
            mode: "cors",
        })
            .then((response) => response.json())
            .then((data) => {
                setImages(data);
            });
    }, []);

//______________________search____________________
    function handleSearch(event) {
        setSearchTerm(event.target.value);
        console.log(setImages);
    }
    //______________________add new image____________________
    const addNew = ({ id, title, owner, description }) => {
        fetch("/api/listImages", {
            method: "post",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                owner: owner,
                description: description,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setImages([
                    ...images,
                    {
                        id: data.id,
                        title: data.title,
                        /*  owner: data.owner,
                        description: data.description, */
                    },
                ]);
            });
    };
    return (
        <IconContext.Provider value={{ style: { fontSize: "35px" } }}>
            <div className="App">
                <Navbar />
                <div className="content-wrapper">
                    <div className="container">
                        <div className="col">
                            <div className="col-md-12 search-wrapper ">
                                <div className="row">
                                    <div className="col-md-8">
                                        <Search
                                            searchTerm={searchTerm}
                                            handleSearch={handleSearch}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md mt-3 ">
                                <div className="container">
                                    <div className="row">
                                        {images.length > 0 &&
                                            images
                                                // .filter(({ title }) =>
                                                //  title.toLowerCase().includes(searchTerm.toLowerCase())
                                                // )
                                                .map((imgId) => {
                                                    return (
                                                        <div className="col" key={imgId}>
                                                                <br />
                                                                <img
                                                                    className="logo-img"
                                                                    src={`/api/image/${imgId}`}
                                                                    alt="logo"
                                                                    height={"250px"}
                                                                />
                                                                <div className="card-body">
                                                                {/*     <p className="card-text">
                                                                        Owner: {img.owner}
                                                                    </p>
                                                                    <p className="card-text">
                                                                        Description: {img.description}
                                                                    </p> */}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </IconContext.Provider>
    );
}
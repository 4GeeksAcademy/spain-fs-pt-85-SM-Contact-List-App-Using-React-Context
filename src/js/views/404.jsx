import React from "react";
import "../../../src/img/cat-in-tower.jpg"
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="mx-auto text-center">
            <h1>404 <br></br> Not Found</h1>
            <img src="cat-in-tower.jpg" alt="404 Not Found" />
            <h5 className="mt-3">Not even our best employee has been able to find what you were looking for</h5>

            <Link to={"/"}>
            <button className="btn btn-primary">Take me home</button>
            </Link>
        </div>

    )
}

export default NotFound;
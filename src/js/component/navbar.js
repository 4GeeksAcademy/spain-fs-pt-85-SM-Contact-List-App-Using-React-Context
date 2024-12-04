import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3 px-3">
			<div>
				<button className="btn btn-success me-3">Register</button>
				<button className="btn btn-warning">Loggin</button>
			</div>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Add new contact</button>
					</Link>
				</div>
		</nav>
	);
};

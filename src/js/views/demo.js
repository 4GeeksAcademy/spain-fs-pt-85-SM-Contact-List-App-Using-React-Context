import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";


export const Demo = () => {
	// const { store, actions } = useContext(Context);

	return (
		<div className="col-lg-8 col-11 mx-auto">
			<h1 className="d-flex justify-content-center">Add a new contact</h1>

			<form >
				<div className="mb-3">
					<label htmlFor="fullName" className="form-label">Full Name</label>
					<input type="password" className="form-control" id="fullName" placeholder="Full Name" required />
				</div>
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail" placeholder="Email" required />
				</div>
				<div className="mb-3">
					<label htmlFor="phoneAdress" className="form-label">Phone</label>
					<input type="number" className="form-control" id="phoneAdress" placeholder="Phone" required />
				</div>
				<div className="mb-3">
					<label htmlFor="adress" className="form-label">Adress</label>
					<input type="text" className="form-control" id="adress" placeholder="Adress" required />
				</div>
				<button type="submit" className="btn btn-primary w-100">Save</button>
			</form>





			<Link to="/">
				<span className="mt-3 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">or get me back to contacts</span>
			</Link>
		</div>
		// <div className="container">
		// 	<ul className="list-group">
		// 		{store.demo.map((item, index) => {
		// 			return (
		// 				<li
		// 					key={index}
		// 					className="list-group-item d-flex justify-content-between"
		// 					style={{ background: item.background }}>
		// 					<Link to={"/single/" + index}>
		// 						<span>Link to: {item.title}</span>
		// 					</Link>
		// 					{// Conditional render example
		// 					// Check to see if the background is orange, if so, display the message
		// 					item.background === "orange" ? (
		// 						<p style={{ color: item.initial }}>
		// 							Check store/flux.js scroll to the actions to see the code
		// 						</p>
		// 					) : null}
		// 					<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
		// 						Change Color
		// 					</button>
		// 				</li>
		// 			);
		// 		})}
		// 	</ul>
		// 	<br />
		// 	<Link to="/">
		// 		<button className="btn btn-primary">Back home</button>
		// 	</Link>
		// </div>
	);
};

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";


export const Demo = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	async function infoHandler() {
		// aqui cuando pulse el botón debería recibir la información que haya ingresado el usuario, la cual podría ser a través de hooks que se cree un objeto
		// y luego como se ve a continuación se debería pasar a la función por un lado el objeto para que sea tratado y por otro el store.loggedUser para que postee la info.
		postContactViaApi(loggedInUser, contactObject)
	}

	async function postContactViaApi(){
		try {
			let response = await fetch(`https://playground.4geeks.com/contact/agendas/SMM/contacts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"name": "test123",
					"phone": "132123123",
					"email": "test123@test@t",
					"address": "test123",
				})
			})
			console.log(response);
			let data = await response.json();
			console.log(data);
			actions.logginViaApi(store.loggedUser);
			console.log("llego antes del navigate");
			
			navigate("/");
			console.log("llego despues del navigate");
			return
		} catch (error) {
			console.log(error);
			return;
		}	
	}

	// función para evitar el comportamiento normal del botón de tipo submit para que así no se recarque la página
	async function noSubmit(e){
		await e.preventDefault();
		return false;
	}

	return (
		<div className="col-lg-8 col-11 mx-auto">
			<h1 className="d-flex justify-content-center">Add a new contact</h1>

			<form onSubmit={noSubmit} >
				<div className="mb-3">
					<label htmlFor="fullName" className="form-label">Full Name</label>
					<input type="text" className="form-control" id="fullName" placeholder="Full Name"  />
				</div>
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail" placeholder="Email"  />
				</div>
				<div className="mb-3">
					<label htmlFor="phoneAdress" className="form-label">Phone</label>
					<input type="number" className="form-control" id="phoneAdress" placeholder="Phone"  />
				</div>
				<div className="mb-3">
					<label htmlFor="adress" className="form-label">Adress</label>
					<input type="text" className="form-control" id="adress" placeholder="Adress"  />
				</div>
				<button type="submit" className="btn btn-primary w-100" onClick={postContactViaApi}>Save</button>
			</form>





			<Link to="/">
				<span className="mt-3 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">or get me back to contacts</span>
			</Link>
		</div>
	);
};

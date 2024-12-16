import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

const Demo = () => {
	const { store, actions } = useContext(Context);
	// función para poder navegar por las páginas del proyecto
	const navigate = useNavigate()
	const [formValue, setFormValue] = useState({
		"name": "",
		"phone": "",
		"email": "",
		"address": ""
	})
	const [returnToHome, setReturnToHome] = useState(false)

	// función para modificar la información del formulario
	function contactFormHandler(e) {
		if (e.target.id === "phone" && /^\d+$/.test(e.target.value) || e.target.id !== "phone") {
            setFormValue({ ...formValue, [e.target.id]: e.target.value });
        }
        else e.preventDefault();
	}

	// función para subir la información del formulario al servidor a través de la API
	async function infoHandler() {
		if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValue.email)) {
			await actions.postContactViaApi(store.loggedUser, formValue,);
			setReturnToHome(true);
		}
		else return;
	}

	// manejo de vuelta a la página principal tras pulsar el botón de guardar contacto
	useEffect(() => {
		if (returnToHome) {
			navigate("/");
			setReturnToHome(false)
		}
	}, [returnToHome])

	// función para evitar el comportamiento normal del botón de tipo submit para que así no se recarque la página
	async function noSubmit(e) {
		await e.preventDefault();
		return false;
	}

	return (
		<div className="col-lg-8 col-11 mx-auto">
			<h1 className="d-flex justify-content-center">Add a new contact</h1>
			{/* inicio del form */}
			<form onSubmit={noSubmit} >
				<div className="mb-3">
					<label htmlFor="fullName" className="form-label">Full Name</label>
					<input type="text" className="form-control" id="name" value={formValue.name} onChange={contactFormHandler} placeholder="Full Name" required />
				</div>
				<div className="mb-3">
					<label htmlFor="inputEmail" className="form-label">Email</label>
					<input type="email" className="form-control" id="email" value={formValue.email} onChange={contactFormHandler} placeholder="Email" />
				</div>
				<div className="mb-3">
					<label htmlFor="phoneAddress" className="form-label">Phone</label>
					<input type="text" className="form-control" id="phone" value={formValue.phone} onChange={contactFormHandler} placeholder="Phone" />
				</div>
				<div className="mb-3">
					<label htmlFor="address" className="form-label">Adress</label>
					<input type="text" className="form-control" id="address" value={formValue.address} onChange={contactFormHandler} placeholder="Address" />
				</div>
				<button type="submit" className="btn btn-primary w-100" onClick={infoHandler}>Save</button>
			</form>
			{/* fin del form */}
			<Link to="/">
				<span className="mt-3 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">or get me back to contacts</span>
			</Link>
		</div>
	);
};

export { Demo }
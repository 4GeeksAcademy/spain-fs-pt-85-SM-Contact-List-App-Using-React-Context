import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

// TODO HACER QUE NAVBAR DESAPAREZCA CUANDO SE ESTÁ EN CUALQUIER PÁGINA QUE NO SEA HOME, se debe modificar el return de la función logginViaApi para que devuelva información
// la cual podrá ser tratada por home para generar los contactos

const Navbar = () => {
	// degradación de objeto context
	const {store, actions} = useContext(Context)
	// hook para los valores de los input
	const [inputValue, setInputValue] = useState("");

	// función para la actualización del valor del input en pantalla
	function inputUpdaterHandler(e){
		setInputValue(e.target.value);
	}

	// función asociada al botón de creación de nuevo usuario
	async function newUserHandler(){
		const validNewUser = inputValue.trim();
		await actions.registerViaApi(validNewUser);
		setInputValue("")
	}

	//función para el manejo del loggin
	async function logginUserHandler(){
		const validLoggedUser = inputValue.trim();
		await actions.setStore(validLoggedUser);
		setInputValue("");
	}

	useEffect(()=>{
		if (!store.loggedUser) return;
		else actions.logginViaApi(store.loggedUser);
	},[store.loggedUser])


	return (
		<nav className="navbar navbar-light bg-light mb-3 px-3">
			<div>
				{/* <!-- Button trigger modal --> */}
				<button type="button" className="btn btn-success me-3" data-bs-toggle="modal" data-bs-target="#registerModal">
					Register
				</button>
				{/* <!-- Modal --> */}
				<div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="registerModalLabel">User Creation</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								Type the user name you want to register:
								<input className="form-control mt-2" type="text" placeholder="New user name" aria-label="default input example" value={inputValue} onChange={inputUpdaterHandler}/>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={newUserHandler}>Register</button>
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>



				{/* <!-- Button trigger modal --> */}
				<button type="button" className="btn btn-warning me-3" data-bs-toggle="modal" data-bs-target="#logginModal">
					Loggin
				</button>
				{/* <!-- Modal --> */}
				<div className="modal fade" id="logginModal" tabIndex="-1" aria-labelledby="logginModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="logginModalLabel">User Loggin</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								Type your user name:
								<input className="form-control mt-2" type="text" placeholder="User name" aria-label="default input example" value={inputValue} onChange={inputUpdaterHandler}/>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={logginUserHandler}>Loggin</button>
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>




			</div>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Add new contact</button>
				</Link>
			</div>
		</nav>
	);
};


export { Navbar };
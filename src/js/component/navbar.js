import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// TODO HACER QUE NAVBAR DESAPAREZCA CUANDO SE ESTÁ EN CUALQUIER PÁGINA QUE NO SEA HOME

const Navbar = () => {
	// hook para los valores de los input
	const [inputValue, setInputValue] = useState("");
	// hook para el valor del nuevo usuario a crear
	const [logginUser, setLogginUser] = useState("");

	// función para la actualización del valor del input en pantalla
	function inputUpdaterHandler(e){
		setInputValue(e.target.value);
	}

	// función asociada al botón de creación de nuevo usuario
	async function newUserHandler(){
		// setNewUser(inputValue);
		await registerViaApi(inputValue);
		setInputValue("")
		// alert(`User ${newUser} created`)
	}

	// función para la creación de usuario a través de la api
	const registerViaApi = async (userToCreate) => {
		try {
			let response = await fetch(`https://playground.4geeks.com/contact/agendas/${userToCreate}`, {
				method: "POST",
			})
			if (response.status === 201) alert(`User ${inputValue} created succesfully!`);
			if (response.status === 405) alert(`Uh oh, we couldn't register the user ${inputValue}`)
			console.log(response);
			let data = await response.json();
			console.log(data);
			return;
	
		} catch (error) {
			console.log(error);
			return;
		}
	}

	//función para el manejo del loggin
	async function logginUserHandler(){
		setLogginUser(inputValue);
		setInputValue("");
	}

	// función para llamar la función que llamará al valor almacenado en logginUser a través de la API
	useEffect(() =>{
		logginViaApi(logginUser)
	}, [logginUser])

	// función para la obtención de la información del usuario a través de la api
	const logginViaApi = async (userToLoggin) => {
		if (userToLoggin){
		try {
			let response = await fetch(`https://playground.4geeks.com/contact/agendas/${userToLoggin}/contacts`,{
				method: "GET",
			})
			if (response.statusText === "Not Found") {
				alert(`User ${userToLoggin} not found in our data base, please register the user first.`);
				setLogginUser("");
			}
			if (response.status === 200) alert(`Welcome ${userToLoggin}!`)
			
			console.log(response);
			let data = await response.json();
			console.log(data);
			return;
			
		} catch (error) {
			console.log(error);
			return;
		}
	}}

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
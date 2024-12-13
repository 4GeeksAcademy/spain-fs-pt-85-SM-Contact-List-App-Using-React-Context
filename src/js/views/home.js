import React, { useState, useEffect, useContext, use } from "react";
import "../../styles/home.css";
import CardComponent from "../component/card-component.jsx";
import { Context } from "../store/appContext.js";
import Modal from "../component/delete-modal.jsx";
import EditModal from "../component/edit-modal.jsx";

//TODO, la página no es responsiva, al final de lg, y en md se salen los botones de la derecha, la imágen no es cuadrada en md y sm

const Home = () => {
	const {store, actions} = useContext(Context);
	// hooks para visibilidad de elementos HTML
	const [textDisplayAfterLoggin, setTextDisplayAfterLoggin] = useState("")
	const [textDisplayBeforeLoggin, setTextDisplayBeforeLoggin] = useState("")
	// definición de constantes para que quede más limpio el código
	const contactDetails = store.contacts;
	const loggedUser = store.loggedUser;
	// hook para almacenar el usuario a eliminar
	const [contactToDelete, setContactToDelete] = useState({});
	
	const cardInfoGenerator = contactDetails.map((contact) =>{
		return	<CardComponent 
		key={contact.id}
		name={contact.name}
		address={contact.address}
		phone={contact.phone}
		email={contact.email}
		buttonOnClick={() => prepareInfoOfContactToDelete(contact)}
		editButtonOnClick={() => prepareInfoOfContactToEdit(contact)}
		/>
	});

	function prepareInfoOfContactToDelete(contactThatMightBeDeleted){
		setContactToDelete(contactThatMightBeDeleted)	
	}

	async function prepareInfoOfContactToEdit(contactThatMightBeEdited){
		await actions.prepareContactToEdit(contactThatMightBeEdited)
	}

	// actions.contactDeleter(loggedUser, contactToDelete)
	async function deleteHandler(){
		await actions.contactDeleter(loggedUser, contactToDelete)
	}

	useEffect(()=>{
		if (loggedUser && contactDetails.length == 0) {
			setTextDisplayAfterLoggin("d-flex justify-content-center fs-3 alert alert-success");
			setTextDisplayBeforeLoggin("d-none");
		}
		else if (!loggedUser) {
			setTextDisplayAfterLoggin("d-none");
			setTextDisplayBeforeLoggin("d-flex justify-content-center fs-3 alert alert-warning");
		}
		else {
			setTextDisplayAfterLoggin("d-none");
			setTextDisplayBeforeLoggin("d-none");
		}
	}, [contactDetails]);



	return (
		<>
			<div>
				{cardInfoGenerator}
				<span className={textDisplayAfterLoggin}>Aún no has añadido ningún contacto, los contactos que agregues se mostrarán en esta página.</span> 
				<span className={textDisplayBeforeLoggin}>Lóguese para poder visualizar sus contactos.</span> 
			</div>
			<Modal confirmButton={deleteHandler} />
			<EditModal />
		</>
	);}

export {Home}
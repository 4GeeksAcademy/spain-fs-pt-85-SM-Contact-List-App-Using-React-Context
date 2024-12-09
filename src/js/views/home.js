import React, { useState, useEffect, useContext, use } from "react";
import "../../styles/home.css";
import CardComponent from "../component/card-component.jsx";
import { Context } from "../store/appContext.js";

//TODO, la página no es responsiva, al final de lg, y en md se salen los botones de la derecha, la imágen no es cuadrada en md y sm


// tenemos varias páginas ya creadas:
// tenemos INDEX que es desde donde estamos diciendo el que queremos renderizar(LAYOUT) y el donde
// tenemos LAYOUT que es donde tenemos el enrutador

// tenemos DEMO que es donde se encontraría el navbar
// tenemos Home que es donde está el cuerpo de la página
// y tenemos single


// para la image 1, me gustaría:
// por un lado tener un elemento navbar para que se ingrese el slug, y que en caso de que este no existe te permita crearlo, dentro de dicho navbar, una vez te ingresas debería aparecer el botón que te lleva a una nueva página donde sigues teniendo tu navbar para deslogarte, a esta página no te debería dejar acceder si estas deslogado.

// hay que crear un componente que sea card generator, el cual debería, mediante props recibir la información de un hook al cual habrá que realizar un map, el objeto deberá tener la información necesaria para poder generar la carta, como el NOMBRE, UBICACIÓN, TELÉFONO y EMAIL. además cada carta deberá tener un botón para poder modificar la info y otro botón para eliminar el contacto. tanto la edición como la eliminación deberá ser comunicada a través de la api al servidor a parte de tenerlo tambien localmente.

// Creación de usuario eliminación y obtención de contactos a través de la API, simplemente hará falta un único string


// PARA LA IMAGE 2, me gustaría
// tener el navbar, que a esta página solo permita acceder si estás logado, que desaparezca del navbar el botón de add new contact.

// la página tendrá un formulario, donde la información generada deberá ser guardada en el objeto, y que al guardar te devuelva a la image 1, donde tanto localmente se actualizará el objeto como se pasará la información a través de la api

// requiere un nombre, y recibir un body con la info de name, phone, email y address, será importante obtener tanto el nombre como el id para poder eliminarlo,igual será para poder actualizar

// se podría hacer tambien, que si no se añade un link a una imagen lo que haga sea generar un número aleatorio y coger una imagen de un array como imagen por defecto, habría que hacer que pueda tomar imágenes de las extensiones más comunes, .jpg, .jpeg, .png, etc.


const Home = () => {
	const {store, actions} = useContext(Context);
	const [textDisplayAfterLoggin, setTextDisplayAfterLoggin] = useState("")
	const [textDisplayBeforeLoggin, setTextDisplayBeforeLoggin] = useState("")
	const contactDetails = store.contacts;
	const loggedUser = store.loggedUser;
	
	const cardInfoGenerator = contactDetails.map((contact, index) =>{
		return	<CardComponent 
		key={index}
		name={contact.name}
		address={contact.address}
		phone={contact.phone}
		email={contact.email}
		/>
	});

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
		<div>
			{cardInfoGenerator}
			<span className={textDisplayAfterLoggin}>Aún no has añadido ningún contacto, los contactos que agregues se mostrarán en esta página.</span> 
			<span className={textDisplayBeforeLoggin}>Lóguese para poder visualizar sus contactos.</span> 
		</div>
	);}

export {Home}
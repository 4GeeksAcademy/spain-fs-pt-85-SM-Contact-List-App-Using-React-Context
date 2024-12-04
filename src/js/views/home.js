import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import CardComponent from "../component/card-component.jsx";




const Home = () => {
	const [cardInfo, setCardInfo] = useState([{
		profilePicture:"https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/02/28/16460502314689.jpg",
		name: "Paco",
		direction:"una dirección",
		contactNumber:"666666666",
		contactEmail:"paco@gmail.com"
	 }]);


		const cardInfoGenerator = cardInfo.map((contact, index) =>{
			return	<CardComponent 
			key={index}
			profilePicture={contact.profilePicture}
			name={contact.name}
			direction={contact.direction}
			contactNumber={contact.contactNumber}
			contactEmail={contact.contactEmail}
			/>
		});

 

	return (
		<div>
			{cardInfoGenerator}
		</div>
	);}

export {Home}
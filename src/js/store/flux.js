const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loggedUser: "SMM",
			contacts: [{
				profilePicture:"https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/02/28/16460502314689.jpg",
				name: "Paco Martinez",
				direction:"otra dirección",
				contactNumber:"999999999",
				contactEmail:"pacoM@gmail.com"
			 }]
		},
		actions: {
			logginViaApi: async function logginViaApi(userToLoggin) {
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
		}
	};
};

export default getState;

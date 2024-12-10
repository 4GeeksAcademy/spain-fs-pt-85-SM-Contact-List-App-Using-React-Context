import { json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loggedUser: "",
			contacts: []
		},
		actions: {
			setStore: (newLoggedUser) => {
				const store = getStore();
				setStore({ ...store, loggedUser: newLoggedUser });
				console.log(2, getStore().loggedUser);
			},

			// función para la creación de usuario a través de la api
			registerViaApi: async function registerViaApi(userToCreate) {
				try {
					let response = await fetch(`https://playground.4geeks.com/contact/agendas/${userToCreate}`, {
						method: "POST",
					})
					if (response.status === 201) alert(`User ${userToCreate} created succesfully!`);
					if (response.status === 405) alert(`Uh oh, we couldn't register the user ${userToCreate}`)
					console.log(response);
					let data = await response.json();
					console.log(data);

					return;
				} catch (error) {
					console.log(error);
					return;
				}
			},

			logginViaApi: async function logginViaApi(userToLoggin) {
				if (userToLoggin) {
					try {
						let response = await fetch(`https://playground.4geeks.com/contact/agendas/${userToLoggin}/contacts`, {
							method: "GET",
						})
						if (response.statusText === "Not Found") {
							alert(`User ${userToLoggin} not found in our data base, please register the user first.`);
							setLogginUser("");
						}
						// if (response.status === 200) alert(`Welcome ${userToLoggin}!`)

						console.log(response);
						let data = await response.json();
						console.log(data);
						const store = getStore()
						setStore({ ...store, contacts: data.contacts });
						console.log("ESTO ES UN TEST");
						return;

					} catch (error) {
						console.log(error);
						return;
					}
				}
			},

			// postNewContact: async (userToLoggin, contactObject) => {
			// 	try {
			// 		let response = await fetch(`https://playground.4geeks.com/contact/agendas/${userToLoggin}/contacts`, {
			// 			method: POST,
			// 			body: json.stringify({
			// 				// "name": `${contactObject.name}`,
			// 				// "phone": `${contactObject.phone}`,
			// 				// "email": `${contactObject.email}`,
			// 				// "address": `${contactObject.address}`
			// 				"name": "test123",
			// 				"phone": "test123",
			// 				"email": "test123",
			// 				"address": "test123"
			// 			})
			// 		})
			// 		console.log(response);
			// 		let data = response.json();
			// 		console.log(data);
			// 		return
					
			// 	} catch (error) {
			// 		console.log(error);
			// 		return;
			// 	}
			// }
		}
	};
};

export default getState;

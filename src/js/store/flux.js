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

			 postContactViaApi: async function postContactViaApi(loggedInUser, contactObject) {
				try {
					let response = await fetch(`https://playground.4geeks.com/contact/agendas/${loggedInUser}/contacts`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"name": contactObject.name,
							"phone": contactObject.phone,
							"email": contactObject.email,
							"address": contactObject.address,
						})
					})
					console.log(response);
					let data = await response.json();
					console.log(data);
					this.logginViaApi(loggedInUser);
					return;
				} catch (error) {
					console.log(error);
					return;
				}
			}
		}
	};
};

export default getState;

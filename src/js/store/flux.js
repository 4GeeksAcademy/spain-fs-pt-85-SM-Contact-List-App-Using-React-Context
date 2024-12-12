import { json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loggedUser: "",
			loggedUserExist: false,
			contacts: []
		},
		actions: {
			setStore: (newLoggedUser) => {
				const store = getStore();
				setStore({ ...store, loggedUser: newLoggedUser });
				console.log(2, getStore().loggedUser);
			},

			logout: function logout(){
				setStore({
					loggedUser: "",
					contacts: []
				});
				console.log("TEST");
				
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
							await setStore({...store, loggedUser: ""});
							alert(`User ${userToLoggin} not found in our data base, please register the user first.`);
							setStore({...store, loggedUserExist: false});
							return;
						}
						// if (response.status === 200) alert(`Welcome ${userToLoggin}!`)
						setStore({...store, loggedUserExist: true});
						console.log(response);
						let data = await response.json();
						console.log(data);
						const store = getStore()
						setStore({ ...store, contacts: data.contacts });
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
			},
			contactDeleter: async function(loggedInUser, contactToDelete){
				console.log(contactToDelete.id)
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${loggedInUser}/contacts/${contactToDelete.id}`, {
						method: "DELETE"
					})
					console.log(response);
					const data = response.json();
					console.log(data);
					this.logginViaApi(loggedInUser);
					return
				} catch (error) {
					console.log(error);
					return
				}
			}
		}
	};
};

export default getState;

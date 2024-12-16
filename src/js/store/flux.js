import { json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			loggedUser: "",
			editFormValue: {
				"name": "",
				"phone": "",
				"email": "",
				"address": ""
			},
			contacts: []
		},
		actions: {
			// función para guardar la variable de usuario logado
			setStore: (newLoggedUser) => {
				const store = getStore();
				setStore({ ...store, loggedUser: newLoggedUser });
			},

			// función para devolver los valores ha su estado inicial
			logout: function logout() {
				setStore({
					loggedUser: "",
					editFormValue: {
						"name": "",
						"phone": "",
						"email": "",
						"address": ""
					},
					contacts: []
				});
			},

			// función para obtener la información específica del contacto a editer
			prepareContactToEdit: async function prepareContactToEdit(contactToEditInfo) {
				const store = getStore();
				await setStore({ ...store, editFormValue: contactToEditInfo })
				return;
			},

			// función para la creación de usuario a través de la api
			registerViaApi: async function registerViaApi(userToCreate) {
				try {
					let response = await fetch(`https://playground.4geeks.com/contact/agendas/${userToCreate}`, {
						method: "POST",
					})
					if (response.status === 201) alert(`User ${userToCreate} created succesfully!`);
					if (response.status === 400) alert(`User ${userToCreate} already exists`)
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

			// función para obtener la información de contactos del usuario a través de la API
			logginViaApi: async function logginViaApi(userToLoggin) {
				if (userToLoggin) {
					try {
						let response = await fetch(`https://playground.4geeks.com/contact/agendas/${userToLoggin}/contacts`, {
							method: "GET",
						})
						if (response.statusText === "Not Found") {
							await setStore({ ...store, loggedUser: "" });
							alert(`User ${userToLoggin} not found in our data base, please register the user first.`);
							setStore({ ...store, loggedUserExist: false });
							return;
						}
						// if (response.status === 200) alert(`Welcome ${userToLoggin}!`)
						setStore({ ...store, loggedUserExist: true });
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

			// función para guardar el contacto creado a través de la API
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

			// función para eliminar el contacto guardado via Api
			contactDeleter: async function (loggedInUser, contactToDelete) {
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
			},

			// función para actualizar el contacto a través de la API
			contactToEditHandler: async function contactToEditHandler(loggedInUser, contactToEdit) {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${loggedInUser}/contacts/${contactToEdit.id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"name": contactToEdit.name,
							"phone": contactToEdit.phone,
							"email": contactToEdit.email,
							"address": contactToEdit.address,
						})
					})
					console.log(response);
					const data = await response.json();
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

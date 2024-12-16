import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

function EditModal() {
    const { store, actions } = useContext(Context);
    const objetToEdit = store.editFormValue;
    const [formValue, setFormValue] = useState({
        "name": "",
        "phone": "",
        "email": "",
        "address": ""
    });
    

    useEffect(() => {
        setFormValue(objetToEdit);
    }, [objetToEdit])

    // función para llamar a la edición del contacto
    async function editHandler() {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValue.email)) {
            await actions.contactToEditHandler(store.loggedUser, formValue);
            alert("Contacto editado");
        }
        else return;
    }

    // función para que se actualicen los datos en el objeto
    function contactFormHandler(e) {
        if (e.target.id === "phone" && /^\d+$/.test(e.target.value) || e.target.id !== "phone") {
            setFormValue({ ...formValue, [e.target.id]: e.target.value });
        }
        else e.preventDefault()
    }

    // función para evitar el funcionamiento normal del botón submit del formulario
    async function noSubmit(e) {
        await e.preventDefault();
        return false;
    }


    return (
        <div className="modal fade" id="editContactModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editContactModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="editContactModalLabel">Edit Contact</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* inicio del formulario */}
                        <form onSubmit={noSubmit} >
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input type="text" className="form-control" id="name" value={formValue.name} onChange={contactFormHandler} placeholder="Full Name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={formValue.email} onChange={contactFormHandler} placeholder="Email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneAddress" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="phone" value={formValue.phone} onChange={contactFormHandler} placeholder="Phone" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Adress</label>
                                <input type="text" className="form-control" id="address" value={formValue.address} onChange={contactFormHandler} placeholder="Address" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" onClick={editHandler}>Edit</button>
                        </form>
                        {/* fin del formulario */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal;
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
    })

    useEffect(() => {
        setFormValue(objetToEdit);
    }, [objetToEdit])

    async function editHandler() {
        await actions.contactToEditHandler(store.loggedUser, formValue);
    }

    function contactFormHandler(e) {
        setFormValue({ ...formValue, [e.target.id]: e.target.value });
    }

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
                                <input type="number" className="form-control" id="phone" value={formValue.phone} onChange={contactFormHandler} placeholder="Phone" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Adress</label>
                                <input type="text" className="form-control" id="address" value={formValue.address} onChange={contactFormHandler} placeholder="Address" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" onClick={editHandler} data-bs-dismiss="modal">Edit</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditModal;
import React from "react";
import PropTypes from "prop-types";

function Modal(props) {
    
    return (
        <div className="modal fade" id="deleteContactModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deleteContactModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="deleteContactModalLabel">Are you sure?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        If you delete this thing the entire universe might go down!
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={props.confirmButton} data-bs-dismiss="modal">Yes baby!</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Oh no!</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Modal;
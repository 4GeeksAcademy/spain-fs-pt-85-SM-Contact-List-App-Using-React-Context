import React from "react";
import PropTypes from "prop-types";
import "../../styles/home.css";
import Modal from "./delete-modal.jsx";

const CardComponent = (props) => {
    
    return (
        <div className="mb-3 d-flex justify-content-center" >
            <div className="col-lg-5 col-md-8 col-11 d-flex justify-content-center border">
                <div className="my-3 col-md-3 d-flex justify-content-center align-items-center">
                    <img src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/02/28/16460502314689.jpg" className="img-fluid rounded-circle ratio ratio-1x1 limits object-fit-cover" alt={props.name}/>
                </div>
                <div className="col-7 d-flex justify-content-center align-items-center flex-row">
                    <div className="card-body" onClick={props.buttonOnClick}>
                        <h5 className="card-title">{props.name}</h5>
                        <div className="card-text"><i className="fa-solid fa-location-dot me-2 fa-fw"></i>{props.address}</div>
                        <div className="card-text"><i className="fa-solid fa-phone-flip me-2 fa-fw"></i>{props.phone}</div>
                        <div className="card-text"><i className="fa-solid fa-envelope me-2 fa-fw"></i>{props.email}</div>
                    </div>
                </div>
                <div className="col-2 d-flex justify-content-start align-items-center">
                    <button className="btn btn-outline-dark border-0 fa-solid fa-pencil" onClick={props.editButtonOnClick} data-bs-toggle="modal" data-bs-target="#editContactModal"></button>
                    <button className="btn btn-outline-dark border-0 fa-solid fa-trash " onClick={props.buttonOnClick} data-bs-toggle="modal" data-bs-target="#deleteContactModal"></button>
                </div>
            </div>
        </div>
    )
}

export default CardComponent;
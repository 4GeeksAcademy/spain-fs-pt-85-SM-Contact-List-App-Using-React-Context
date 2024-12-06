import React from "react";
import PropTypes from "prop-types";
import "../../styles/home.css";

const CardComponent = (props) => {
    return (
        <div className="mb-3 d-flex justify-content-center" >
            <div className="col-lg-5 d-flex justify-content-center border">
                <div className="my-3 col-md-3 d-flex justify-content-center align-items-center">
                    <img src={props.profilePicture} className="img-fluid rounded-circle ratio ratio-1x1 limits object-fit-cover" alt={props.name}/>
                </div>
                <div className="col-md-7 d-flex justify-content-center align-items-center flex-row">
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <div className="card-text"><i className="fa-solid fa-location-dot me-2"></i>{props.direction}</div>
                        <div className="card-text"><i className="fa-solid fa-phone-flip me-2"></i>{props.contactNumber}</div>
                        <div className="card-text"><i className="fa-solid fa-envelope me-2"></i>{props.contactEmail}</div>
                    </div>
                </div>
                <div className="col-md-2 d-flex justify-content-start align-items-center">
                    <span className="fa-solid fa-pencil mx-3" onClick={props.test}></span>
                    <span className="fa-solid fa-trash mx-3"></span>
                </div>
            </div>
        </div>
    )
}

export default CardComponent;
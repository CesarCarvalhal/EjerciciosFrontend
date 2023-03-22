import React from "react";
import { Link } from "react-router-dom";


const NotFound = () => {
    return (
        <div data-cy="pageBody">
        <h2 data-cy="pageHeader">Aquí no está</h2>
        <p data-cy="pageText">Creo que te has equivocado. Esa página no existe</p>
        <Link to="/">Inicio</Link>
        </div>
    );
    }

export default NotFound;
import './TopBar.css';
import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const TopBar = (props) => {

    const doLogout = () => {
		sendLogoutRequest();
		localStorage.removeItem("sessionId");
		localStorage.removeItem("sessionToken");
		props.setLoggedIn(false);
	};

	const sendLogoutRequest = () => {
		const id = localStorage.getItem("sessionId");
		const token = localStorage.getItem("sessionToken");
		if (id !== null && token !== null) {
			axios.delete(`http://raspi:8000/api/v2/sessions/${id}`, { headers: { "Session-Token": token } });
		}
	};

    return(
            <div className="topBar" data-cy="topBar">
                <div data-cy="headerHello">
                    <strong>¡Hola!</strong> Quizá quieras ir a la <Link to="/">página principal</Link>
                </div>
                <p hidden={props.loggedIn} data-cy='loginInfo'>Parece que no estás logueado | <Link to='/login'>Login</Link> | <Link to='/register'>Registro</Link></p>
                <p hidden={!props.loggedIn} data-cy='logoutInfo'>Has iniciado sesión. ¿Quieres <a href="#" onClick={doLogout}>desloguearte</a>?</p>
            </div>
    );
};

export default TopBar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";
import React from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const UserLogin = () => {
  const [, setLoggedIn] = useOutletContext();

	const [formData, setFormData] = useState({
		username: '',
		password: ''
	  });
	  
	  const navigate = useNavigate();

	  const [errorWrongPasswordHidden, setErrorWrongPasswordHidden] = useState(true);
	  const [errorUserNotFoundHidden, setErrorUserNotFoundHidden] = useState(true);
  
	const onChangeUsername = (e) => {
		setFormData({
			username: e.target.value,
			password: formData.password,
		});
	};

	const onChangePassword = (e) => {
		setFormData({
			username: formData.username,
			password: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (formData.username.length === 0 || formData.password.length === 0) {
			return;
		}

		setErrorWrongPasswordHidden(true);
		setErrorUserNotFoundHidden(true);

		axios
		.post("http://raspi:8000/api/v2/sessions", formData)
		.then((response) => {
			localStorage.setItem("sessionToken", response.data.session_token);
			localStorage.setItem("sessionId", response.data.session_id);
			navigate("/");
			setLoggedIn(true);
		})
		.catch((err) => {
			if (err.response.status === 401) {
				setErrorWrongPasswordHidden(false);
			} else if (err.response.status === 404) {
				setErrorUserNotFoundHidden(false);
			}
		});
	};

	return (
		<div>
			<h1 data-cy="pageHeader" className="loginHeader">Inicia sesión</h1>
			
			<p data-cy="errorWrongPassword" hidden={errorWrongPasswordHidden} className="loginUserFeedback">
				Contraseña introducida inválida
			</p>
			<p data-cy="errorUserNotFound" hidden={errorUserNotFoundHidden} className="loginUserFeedback">
				No se ha encontrado una cuenta de usuario para ese nombre
			</p>
			
			<form data-cy="loginForm" className="loginForm" onSubmit={onSubmit}>
				<input data-cy="inputUsername" className="loginFormInput" type="text" onChange={onChangeUsername} placeholder="my.name"></input>
				<br></br>
				<input data-cy="inputPassword" className="loginFormInput" type="password" onChange={onChangePassword} placeholder="Contraseña"></input>
				<br></br>
				<input data-cy="inputSubmit" className="loginFormInput" type="submit" value="Login"></input>
			</form>
		</div>
	);
};

export default UserLogin;

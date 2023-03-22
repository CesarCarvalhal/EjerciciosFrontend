import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import './UserRegister.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const [successTextHiden, setSuccessTextHiden] = useState(true);
  const [ErrorPasswordsHidden, setErrorPasswordsHidden] = useState(true);
  const [ErrorAlreadyRegisteredHidden, setErrorAlreadyRegisteredHidden,] = useState(true);

  const onChangeUsername = (e) => {
    setFormData({
      username: e.target.value, // Asignamos el valor del input de username
      password: formData.password, // Preservamos el valor
      passwordConfirm: formData.passwordConfirm, // Preservamos el valor
    });
  };

  const onChangePassword = (e) => {
    setFormData({
      username: formData.username,
      password: e.target.value,
      passwordConfirm: formData.passwordConfirm,
    });
  };

  const onChangePasswordConfirm = (e) => {
    setFormData({
      username: formData.username,
      password: formData.password,
      passwordConfirm: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      formData.username.length === 0 ||
      formData.password.length === 0 ||
      formData.passwordConfirm.length === 0
    ) {
      return;
    }

    setSuccessTextHiden(true);
    setErrorPasswordsHidden(true);
    setErrorAlreadyRegisteredHidden(true);

    axios
      .post("http://raspi:8000/api/v2/users", {
        username: formData.username,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      })
      .then((response) => {
        console.log(response);
        setSuccessTextHiden(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          setErrorPasswordsHidden(false);
        } else if (error.response.status === 409) {
          setErrorAlreadyRegisteredHidden(false);
        }
      });
  };

  return (
    <div>
      <h1 data-cy="pageHeader" className="registerHeader">
        Crea tu cuenta
      </h1>

      <p
        data-cy="successText"
        className="responseUserFeedback"
        hidden={successTextHiden}
      >
        ¡Te has registrado con éxito!
      </p>
      <p
        data-cy="errorPasswords"
        className="responseUserFeedback"
        hidden={ErrorPasswordsHidden}
      >
        No se ha registrado el usuario, quizá porque las contraseñas no
        coincidían
      </p>
      <p
        data-cy="errorAlreadyRegistered"
        className="responseUserFeedback"
        hidden={ErrorAlreadyRegisteredHidden}
      >
        La petición ha fallado porque ya existe un usuario con ese nombre
      </p>

      <form data-cy="registerForm" className="registerForm" onSubmit={onSubmit}>
        <input
          className="registerFormInput"
          type="text"
          onChange={onChangeUsername}
          placeholder="my.name"
          data-cy="inputUsername"
        />
        <br></br>
        <input
          className="registerFormInput"
          type="password"
          onChange={onChangePassword}
          placeholder="Contraseña"
          data-cy="inputPassword"
        />
        <br></br>
        <input
          className="registerFormInput"
          type="password"
          onChange={onChangePasswordConfirm}
          placeholder="Confirmar contraseña"
          data-cy="inputPasswordConfirm"
        />
        <br></br>
        <input
          className="registerFormInput"
          type="submit"
          value="Registro"
          data-cy="inputSubmit"
        />
      </form>
    </div>
  );
};

export default UserRegister;


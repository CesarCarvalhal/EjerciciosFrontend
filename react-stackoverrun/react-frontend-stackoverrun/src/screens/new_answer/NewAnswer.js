import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";


const NewAnswer = () => {
	const params = useParams();
    const navigate = useNavigate();
	const token = localStorage.getItem("sessionToken");
	const [answer, setAnswer] = useState("");

	const onChangeAnswer = (e) => {
		setAnswer(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		axios
			.post(`http://raspi:8000/api/v2/dashboards/${params.dashboardId}/questions/${params.questionId}/answers`, { description: answer }, { headers: { "Session-Token": token } })
			.then((response) => {
				navigate(`/dashboards/${params.dashboardId}/questions/${params.questionId}`);
			})
			.catch((err) => {
				alert("Se produjo un error");
			});
	};

    
    return (
        <div>
            <p data-cy="loginWarning" hidden={token != null}>¿Por qué no haces login?</p>

			<form onSubmit={onSubmit}>
				<input type="textArea" data-cy="inputAnswer" onChange={onChangeAnswer}></input>
				<input type="submit" data-cy="submitButton" disabled={token == null}></input>
			</form>

            <footer>
                <p data-cy='footerCopyright'>© César Carvalhal Tajes</p>
                <p data-cy='footerDebugInfo'>Desde aquí puedes crear una nueva respuesta para la pregunta con ID: {params.questionId}, que pertenece al dashboard con ID: {params.dashboardId}</p>
            </footer>
        </div>
    );
};

export default NewAnswer;
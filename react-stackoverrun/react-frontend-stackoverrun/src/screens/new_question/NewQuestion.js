import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const NewQuestion = () => {
    const params = useParams();
    const navigate = useNavigate();
	const token = localStorage.getItem("sessionToken");

    const [formData, setFormData] = useState({
		title: "",
		description: "",
	});
    
    const onChangeTitle = (e) => {
		setFormData({
			title: e.target.value,
			description: formData.description,
		});
	};

	const onChangeDescription = (e) => {
		setFormData({
			title: formData.title,
			description: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				`http://raspi:8000/api/v2/dashboards/${params.dashboardId}/questions`,
				{
					title: formData.title,
					description: formData.description,
				},
				{
					headers: { "Session-Token": token },
				}
			)
			.then((response) => {
				navigate(`/dashboards/${params.dashboardId}`);
			})
			.catch((err) => {
				alert("Se produjo un error");
			});
	};
    
    return (
        <div>
            <p data-cy="loginWarning" hidden={token != null}>
                Debes loguearte
			</p>
            <form onSubmit={onSubmit}>
				<input type="text" data-cy="inputQuestionTitle" onChange={onChangeTitle}></input>
				<input type="textArea" data-cy="inputQuestionDescription" onChange={onChangeDescription}></input>
				<input type="submit" data-cy="submitButton" disabled={token == null}></input>
			</form>
            <footer>
                <p data-cy='footerCopyright'>© César Carvalhal Tajes</p>
                <p data-cy='footerDebugInfo'>Desde aquí puedes crear una nueva pregunta para el dashboard con ID: {params.dashboardId}</p>
            </footer>
        </div>
    );
};

export default NewQuestion;
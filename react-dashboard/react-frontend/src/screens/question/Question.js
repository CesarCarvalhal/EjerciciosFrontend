import React from "react";
import "./Question.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerListItem from "../../components/dashboard_list_item/AnswerListItem";
import { useParams } from 'react-router-dom';

const Question = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState([]);
  const params = useParams();
  const [answersPublished, setAnswersPublished] = useState(0);
  const [formData, setFormData] = useState({
    description: "",
  });

  useEffect(() => {
    axios.get(`http://raspi:8000/api/v1/dashboards/${params.dashboardId}/questions/${params.questionId}`).then((response) => {
        setTitle(response.data.question_title);
        console.log(response.data);
        setDescription(response.data.question);
        setAnswers(response.data.answers);
        });
    }, [answersPublished]);

    const answerToComponent = (a) => {
        return <AnswerListItem answer={a} />;
    };

    const handleChange = (e) => {
        setFormData({ description: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.description.length === 0) {
            return;
        }
        axios.post('http://raspi:8000/api/v1/dashboards/'+params.dashboardId +'/questions/'+params.questionId+'/answers', formData).then(response => {
            setAnswersPublished(answersPublished + 1)
        })
        setFormData({ description: ''}) // Vaciar el formulario
    }

      


  return (
    <div data-cy='issue18body'>
        <h1 data-cy='issue18title' className="answer">{title}</h1>
        <p data-cy='issue18description' className="answer">{description}</p>

        <div data-cy='answersList'>
            {answers.map(answerToComponent)}
        </div>
        <p data-cy='noAnswers' className="answer">
            {answers.length === 0 ? "Aquí no hay respuestas" : ""}
            </p>
      
        <div data-cy='formContainer' className='formContainer'>
          <h4>Adelante, responde a la pregunta</h4>
          <form data-cy='newAnswerForm' onSubmit={handleSubmit}>
            <input data-cy='newAnswerDescription' placeholder='Texto de la respuesta' value={formData.description} onChange={handleChange}></input><br/>
            <button data-cy='postDataButton'>Escribir respuesta</button>
          </form>
        </div>
      
      </div>

      
    
  );
};

export default Question;
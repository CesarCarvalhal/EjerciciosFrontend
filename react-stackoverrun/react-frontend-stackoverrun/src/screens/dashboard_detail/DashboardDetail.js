import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionListItem from '../../components/question_list_item/QuestionListItem';
import { useState } from 'react';


const DashboardDetail = () => {
    const params = useParams();
    const [dashboardTitle, setDashboardTitle] = useState('');
    const [dashboardDescription, setDashboardDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [searchText, setSearchText] = useState('');

	const linkURL = `/dashboards/${params.dashboardId}/newQuestion`;

    useEffect (() => {
        axios.get(`http://raspi:8000/api/v2/dashboards/${params.dashboardId}`).then((response) => {
            setDashboardTitle(response.data.title);
            setDashboardDescription(response.data.description);
            setQuestions(response.data.questions);
        });
    }, []);


    const onChange = (e) => {
      setSearchText(e.target.value);
    }

    const onSubmit = (e) => {
      e.preventDefault();
  
      if (searchText.match(/.*[a-zA-Z]{3,}/)) {
        axios.get(`http://raspi:8000/api/v2/dashboards/2?search=${searchText}`).then((response) => {
          setQuestions(response.data.questions);
        });
      } else {
        alert("Introduce al menos 3 letras");
      }
    };
  

    return (
      <div>
        <h1 data-cy="header">{dashboardTitle}</h1>
        <h3 data-cy="description">{dashboardDescription}</h3>

        <form data-cy='searchForm' onSubmit={onSubmit}>
          <input data-cy='inputSearch' type='text' placeholder='programación' onChange={onChange}/>
          <input data-cy='submitInput' type='submit' value='Buscar'/>
        </form>
        
        <div data-cy="questionsList">
          {questions.map((q) => {
            return <QuestionListItem question={q} />;
          })}
        </div>

        <a data-cy="publishQuestionLink" href={linkURL}>Hacer una pregunta</a>

        <footer>
          <p data-cy="footerCopyright">© César Carvalhal Tajes</p>
          <p data-cy="footerDebugInfo">
            Estás visitando el dashboard con ID: {params.dashboardId}
          </p>
        </footer>
      </div>
    );
};

export default DashboardDetail;
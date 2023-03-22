import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AnswerListItem from '../../components/answer_list_item/AnswerListItem';
import { useState } from 'react';


const QuestionDetail = () => {
    const params = useParams();
    const [questionTitle, setQuestionTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [hidden, setHidden] = useState(false);

    const linkURL = `/dashboards/${params.dashboardId}/questions/${params.questionId}/newAnswer`;


    useEffect (() => {
        axios.get(`http://raspi:8000/api/v2/dashboards/${params.dashboardId}/questions/${params.questionId}?page_size=5`).then((response) => {
          console.log (response.data);  
          setQuestionTitle(response.data.question_title);
            setQuestion(response.data.question);
            setAnswers(response.data.answers);
        });
    }, []);


 const onClick = () => {
    console.log('click');
    axios.get(`http://raspi:8000/api/v2/dashboards/${params.dashboardId}/questions/${params.questionId}?page_size=5&older_than=${answers[answers.length-1].created_at}`).then((response) => {
        console.log (response.data);
        setAnswers(answers.concat(response.data.answers));

        if (response.data.answers.length === 0) {
            setHidden(true);
        }
    });
}

    return (
      <div>
        <h1 data-cy="header">{questionTitle}</h1>
        <h3 data-cy="description">{question}</h3>

        <div data-cy="answersList">
          {answers.map((a) => {
            return <AnswerListItem answer={a} />;
          })}
        </div>

        <a data-cy="publishAnswerLink" href={linkURL}>Responder</a>

        <button data-cy="moreItemsButton" onClick={onClick} hidden={hidden}>Cargar más</button>

        <footer>
          <p data-cy="footerCopyright">© César Carvalhal Tajes</p>
          <p data-cy="footerDebugInfo">Esta es la pregunta con ID: {params.questionId}, 
          que pertenece al dashboard con ID: {params.dashboardId}
          </p>
        </footer>
      </div>
    );
};

export default QuestionDetail;
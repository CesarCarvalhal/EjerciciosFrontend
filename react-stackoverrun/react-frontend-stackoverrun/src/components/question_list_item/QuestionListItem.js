import "./QuestionListItem.css"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from "react";

const QuestionListItem = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/dashboards/${params.dashboardId}/questions/${props.question.question_id}`);
    }

    
    return <div onClick={onClick} className='question-li' key={props.question['question_id']}>
        <h3>{props.question.title}</h3>
        <p>{props.question.description}</p>
    </div>
}

export default QuestionListItem;

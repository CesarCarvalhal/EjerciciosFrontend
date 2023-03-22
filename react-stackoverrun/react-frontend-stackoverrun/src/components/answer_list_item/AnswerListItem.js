import "./AnswerListItem.css";
import React from "react";

const AnswerListItem = (props) => {
    return (
    <div className="answer-li">
            <h3>{props.answer.title}</h3>
            <p>{props.answer.description}</p>
        </div>
    );
};

export default AnswerListItem;
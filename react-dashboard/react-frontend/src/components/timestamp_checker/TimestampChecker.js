import React, { useEffect } from "react";
import { useState } from "react";


const TimestampChecker = (props) => {
  const [time, setTime] = useState("No hay timestamp aún");
  const [loading, setLoading] = useState(false);
  const axios = require("axios");

  useEffect(() => {
    setLoading(true);
    axios
    .get("http://time.akamai.com/")
      .then((response) => {
        const date = new Date(parseInt(response.data) * 1000).toLocaleString();
        setTime(date);
        setLoading(false);
      }
      )
  }, [props.formatDate]);

  
  return (
    <div data-cy="timestampChecker">
      <p data-cy="title">El timestamp de acuerdo al servidor de Akamai:</p>
      <p data-cy="timestamp">{time}</p>
    </div>
  );
};

export default TimestampChecker;

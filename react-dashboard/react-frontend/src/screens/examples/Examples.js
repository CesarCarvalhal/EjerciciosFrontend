import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleCounter from "../../components/simple_counter/SimpleCounter";
import SimpleColorPicker from "../../components/simple_color_picker/Simple_color_picker";
import SimpleStyleChanger from "../../components/simple_style_changer/SimpleStyleChanger";
import TimestampChecker from "../../components/timestamp_checker/TimestampChecker";
import axios from "axios";

const Examples = () => {
  const [number, setNumber] = useState(0);
  const onClickCounter = () => {
    setNumber(number + 1);
  };

  useEffect(() => {
    document.title = `Has clicado ${number} veces`;
  }, [number]);

  const [headerColor, setHeaderColor] = useState("rgb(0, 0, 0)");
  const onClickHeaderColor = () => {
    if (headerColor === "rgb(0, 0, 0)") {
      setHeaderColor("rgb(243, 0, 0)");
    } else {
      setHeaderColor("rgb(0, 0, 0)");
    }
  };

  const [dashboards, setDashboards] = useState([]);
  useEffect(() => {
    axios.get("http://raspi:8000/api/v1/dashboards").then((response) => {
      setDashboards(response.data);
    });
  }, []);

  return (
    <div>
      <div data-cy="issue12div">
        <h2 data-cy="pageHeader" style={{ color: headerColor }}>
          Ejemplos
        </h2>
        <button data-cy="issue12button" onClick={onClickHeaderColor}>
          Cambiar color
        </button>
      </div>
      <h4 data-cy="issue6link">
        <Link to="/">Regresar a principal</Link>
      </h4>
      <div data-cy="issue3div">
        <h1>Ejercicio 3</h1>
        <SimpleCounter onClickCounter={onClickCounter} number={number} />
      </div>
      <div data-cy="issue4div">
        <h1>Ejercicio 4</h1>
        <SimpleColorPicker />
      </div>
      <div data-cy="issue5div">
        <h1>Ejercicio 5</h1>
        <SimpleStyleChanger />
      </div>
      <div data-cy="issue13div">
        <h1>Ejercicio 13</h1>
        <TimestampChecker />
      </div>
      <div data-cy="issue14div">
        <h1>Ejercicio 14</h1>
        <TimestampChecker formatDate={true} />
      </div>
      <div data-cy="issue15div">
        <h1>Ejercicio 15</h1>
        <p>Se han recuperado {dashboards.length} dashboards</p>
      </div>
    </div>
  );
};

export default Examples;

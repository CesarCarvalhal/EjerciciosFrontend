import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div data-cy="issue3body">
      <h2 data-cy="pageHeader">Otra información</h2>
      <p data-cy="paragraph378">
        Soy un estudiante de CPR AFUNDACIÓN, un centro envidiable. Estoy progresando adecuadamente en mis conocimientos de React.
      </p>
      <h4 data-cy="issue6link">
        <Link to="/">Regresar a principal</Link>
      </h4>
    </div>
  );
};

export default About;

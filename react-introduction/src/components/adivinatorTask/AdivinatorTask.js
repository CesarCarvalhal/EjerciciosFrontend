import React from "react";
import adivino from "./adivino.jpg";
import "./style.css";


class AdivinatorTask extends React.Component {
  constructor(props) {
    // Llamamos al constructor de la clase padre React.Component
    super(props);
    this.state = {
      number: 0,
      random: 0,
      message: "",
    };
  }


  handleChange = (event) => { 
    this.setState({ number: event.target.value }); //Actualizamos el estado con el valor del input
  };

  handleSubmit = (event) => {
    event.preventDefault(); // Evitamos que se recargue la pagina
    const random = Math.floor(Math.random() * 5) + 1;
    this.setState({ random: random }); 
    if (this.state.number == random) { // Comparamos el valor del input con el numero aleatorio
      this.setState({ message: "Has ganado!" });
    } else {
      this.setState({ message: "Has perdido! El numero era " + random });
    }
  };


  render() {
    return (
      <div>
        <img src={adivino} className="imagen" alt="adivino" />
        <form onSubmit={this.handleSubmit}> 
          <label>
            Número:
            <input className="input0"
              type="number"
              value={this.state.number}
              onChange={this.handleChange} //Llamamos a la funcion handleChange cuando cambia el valor del input
            />
          </label>
          <input className="bottom" type="submit" value="Enviar" />
        </form>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default AdivinatorTask;

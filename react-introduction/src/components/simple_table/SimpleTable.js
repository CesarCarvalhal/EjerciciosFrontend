import React from "react";

class SimpleTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Oferta de empleo</th>
            <th>Salario anual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desarrollador React</td>
            <td>63913</td>
          </tr>
          <tr>
            <td>Desarrollador iOS</td>
            <td>43948</td>
          </tr>
          <tr>
            <td>Desarrollador Android</td>
            <td>35313</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default SimpleTable; // Para poder usarlo desde otro fichero

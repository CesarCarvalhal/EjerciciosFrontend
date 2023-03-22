import React from "react";

const ParitySimulationRow = (props) => {
    return (
        <tr>
            <td>{props.firstBit}</td>
            <td>{props.secondBit}</td>
            <td>{props.firstBit ^ props.secondBit}</td>
        </tr>
    );
};


const ParitySimulationTable = () => {
    let rows = [];
    for (let i = 0; i < 10; i++) {
        rows.push(<ParitySimulationRow firstBit={Math.round(Math.random())} secondBit={Math.round(Math.random())} />);
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>DISCO DE DATOS 1</th>
                    <th>DISCO DE DATOS 2</th>
                    <th>DISCO DE PARIDAD</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

export default ParitySimulationTable;
import React from "react";
import { useParams } from "react-router-dom";

const MultiplicationTable = (props) => {
    const params = useParams();
    return (
        <div data-cy='issue9body'>
            <h3 data-cy='pageHeader'>Multiplicación de {params.multiplicationNumber}</h3>
            <table>
                <thead>
                    <tr>
                        <th>PRIMER NÚMERO</th>
                        <th>SEGUNDO NÚMERO</th>
                        <th>VALOR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{params.multiplicationNumber}</td>
                        <td>1</td>
                        <td>{params.multiplicationNumber*1}</td>

                    </tr>
                    <tr>
                        <td>{params.multiplicationNumber}</td>
                        <td>2</td>
                        <td>{params.multiplicationNumber*2}</td>

                    </tr>
                    <tr>
                        <td>{params.multiplicationNumber}</td>
                        <td>3</td>
                        <td>{params.multiplicationNumber*3}</td>

                    </tr>
                    <tr>
                        <td>{params.multiplicationNumber}</td>
                        <td>4</td>
                        <td>{params.multiplicationNumber*4}</td>

                    </tr>
                    <tr>
                        <td>{params.multiplicationNumber}</td>
                        <td>5</td>
                        <td>{params.multiplicationNumber*5}</td>

                    </tr>
                    <tr>
                        <td>{params.multiplicationNumber}</td>
                        <td>6</td>
                        <td>{params.multiplicationNumber*6}</td>

                    </tr>
                    <tr>
                        <td>{params.multiplicationNumber}</td>
                        <td>7</td>
                        <td>{params.multiplicationNumber*7}</td>

                    </tr>
                    <tr>
                        <td>{params.multiplicationNumber}</td>
                        <td>8</td>
                        <td>{params.multiplicationNumber*8}</td>

                    </tr>
                    <tr>
                        <td>{params.multiplicationNumber}</td>
                        <td>9</td>
                        <td>{params.multiplicationNumber*9}</td>

                    </tr>
                    <tr>
                        <td>{params.multiplicationNumber}</td>
                        <td>10</td>
                        <td>{params.multiplicationNumber*10}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
    }

export default MultiplicationTable;
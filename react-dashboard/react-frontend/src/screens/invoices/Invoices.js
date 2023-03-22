import React from "react";
import { useParams } from "react-router-dom";
import {useEffect} from 'react';


const Invoices = (props) => {
  useEffect(() => {
    document.title = "F" + params.invoiceId;
  });
  const params = useParams();
  return (
    <div data-cy='issue8body'>
        <p>Parámetro: {params.invoiceId}</p>
        <h2 data-cy='invoiceNumberHeader'>Factura_{params.invoiceId}</h2>
    </div>
  )
}

export default Invoices;

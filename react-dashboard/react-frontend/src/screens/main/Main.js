import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import axios from "axios";
import { useState, useEffect } from "react";
import DashboardListItem from "../../components/dashboard_list_item/DashboardListItem";


const Main = () => {
  useEffect(() => {
    document.title = "Main page";
  });

  const [dashboards, setDashboards] = useState([]);
  useEffect(() => {
    axios.get("http://raspi:8000/api/v1/dashboards").then((response) => {
      console.log(response.data);
      setDashboards(response.data);
    });
  }, []);

  return (
    <div data-cy="issue3body">
      <h2 data-cy="pageHeader">Principal</h2>
      <div data-cy='dashboardsList'>
      { dashboards.map((d) => { return <DashboardListItem dashboard={d}/> }) }
    </div>

      <footer>
        <div className="footer-section">
          <h3>Enlaces Link</h3>
          <ul>
            <li>
              <Link to="/about">Acerca de</Link>
            </li>
            <li>
              <Link to="/examples">Ejemplos</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Enlaces a href</h3>
          <ul>
            <li>
              <a href="/about">Acerca de</a>
            </li>
            <li>
              <a href="/examples">Ejemplos</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Main;

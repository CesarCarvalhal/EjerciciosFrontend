import { useState, useEffect } from "react";
import DashboardListItem from "../../components/dashboard_list_item/DashboardListItem";
import React from "react";
import axios from "axios";

const Dashboards = () => {
  const [dashboards, setDashboards] = useState([]);
  useEffect(() => {
    axios.get("http://raspi:8000/api/v2/dashboards").then((response) => {
      setDashboards(response.data);
    });
  }, []);

  return (
    <div>
      <div data-cy="dashboardsList">
        {dashboards.map((d) => {
          return <DashboardListItem dashboard={d} />;
        })}
      </div>
      <footer>
        <p data-cy="footerCopyright">© César Carvalhal Tajes</p>
      </footer>
    </div>
  );
};

export default Dashboards;

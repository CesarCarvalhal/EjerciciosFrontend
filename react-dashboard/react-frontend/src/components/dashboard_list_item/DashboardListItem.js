import "./DashboardListItem.css"
import { useNavigate } from "react-router-dom";


const DashboardListItem = (props) => {
    const navigate = useNavigate();
    const dashboard = props.dashboard;
    const handleClick = () => {
        navigate(`/dashboards/${dashboard.id}`);
    }
    return (
        <div className="dashboard-li" onClick={handleClick}>
            <h3>{dashboard.title}</h3>
            <p>{dashboard.description}</p>
        </div>
    );
}

export default DashboardListItem;

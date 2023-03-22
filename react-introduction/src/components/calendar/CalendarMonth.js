import React from "react";
import "./calendar.css";
import CalendarDay from "./CalendarDay";

class CalendarMonth extends React.Component {
  
    render() {
    const days = [];

    // Aquí rellenamos tantos days como sea necesario
    for (let i = 0; i < this.props.numberOfDays; i++) {
      days.push(<CalendarDay day={i + 1} isSunday={i % 7 === 0} />);
    }

    // Aquí rellenamos los días que faltan para completar la semana
    for (let i = 0; i < this.props.startWeekDay; i++) {
      days.unshift(<CalendarDay day="" />);
    }

    return <div className='calendar-month box'>{days}</div>;
  }
}

export default CalendarMonth;

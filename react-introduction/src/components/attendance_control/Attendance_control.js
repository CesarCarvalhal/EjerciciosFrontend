import React from "react";

class AttendanceControlRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.entranceHour}:{this.props.entranceMinute}</td>
        <td>{this.props.exitHour}:{this.props.exitMinute}</td>
        <td>{this.props.exitHour < this.props.entranceHour ? 'ERROR' : (this.props.exitHour - this.props.entranceHour) * 60 + (this.props.exitMinute - this.props.entranceMinute)}</td>
      </tr>
    );
  }
}

class AttendanceControlTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>HORA DE ENTRADA</th>
            <th>HORA DE SALIDA</th>
            <th>MINUTOS</th>
          </tr>
        </thead>
        <tbody>
            <AttendanceControlRow entranceHour={12} entranceMinute={10} exitHour={15} exitMinute={12} />
            <AttendanceControlRow entranceHour={7} entranceMinute={30} exitHour={7} exitMinute={35} />
            <AttendanceControlRow entranceHour={9} entranceMinute={0} exitHour={23} exitMinute={30} />
            <AttendanceControlRow entranceHour={7} entranceMinute={59} exitHour={6} exitMinute={28} />
            <AttendanceControlRow entranceHour={0} entranceMinute={14} exitHour={1} exitMinute={14} />
          </tbody>
      </table>
    );
  }
}

export default AttendanceControlTable;

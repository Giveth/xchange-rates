import React from "react";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

export default class CalendarDisplay extends React.Component {
  shouldComponentUpdate(nextProps) {
    return String(nextProps.date) !== String(this.props.date);
  }
  componentDidMount() {
    // focusable;
    const calendarInput = document.getElementById("calendar-input");
    calendarInput.setAttribute("focusable", false);
  }
  render() {
    return (
      <div className="margin-auto">
        <ReactDatePicker
          id="calendar-input"
          className="calendar-input"
          todayButton={"Pick a date older than today"}
          maxDate={moment().subtract(1, "days")}
          selected={this.props.date}
          onChange={this.props.onDateChange}
          readOnly={true}
          dateFormat="ddd, DD/MM/YYYY"
        />
      </div>
    );
  }
}

import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import * as AppActions from './actions/AppActions'

import 'react-datepicker/dist/react-datepicker.css';

export default class CalendarDisplay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      date: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onDateChange(date) {
    let timestamp = moment(date).startOf('date').add(12, 'hours').unix();
    console.log('GOT TS ',timestamp)
    AppActions.updateTimestamp(timestamp)
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    let timestamp = date.startOf('date').add(12, 'hours').unix();
    AppActions.updateTimestamp(timestamp)
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div className="margin-auto">
        <ReactDatePicker
          todayButton={"Today"}
          maxDate={moment()}
          selected={this.state.startDate}
          onChange={this.handleChange}
          dateFormat="ddd, MMMM Do YYYY"
        />
      </div>
    )
  }
}

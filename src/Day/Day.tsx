import * as React from 'react';
import Hour from '../Hour';
import * as theme from './theme.scss';


interface IDayProps {
  start: Date;
  events: Calendar.Event[];
  onEventChange?: () => void;
  onEventClick?: () => void;
  onEventContextMenu?: () => void;
}

interface IDayState {
}

export default class Day extends React.Component<IDayProps, IDayState> {

  getEvents( ) {
    const tmp = [];
    const start = new Date(this.props.start.getTime());
    start.setHours(0, 0, 0, 0);
    const end = new Date(this.props.start.getTime());
    end.setHours(23, 59, 59, 99);
    for (let i = 0; i < this.props.events.length; i++) {
      const event = this.props.events[i];
      const eventTimeStart = new Date(event.start.getTime());
      const eventTimeEnd = new Date(event.end.getTime());
      const tmpEvent: Calendar.Event = {
        start: new Date(event.start.getTime()),
        end: new Date(event.end.getTime()),
        summary: event.summary,
        description: event.description,
      };
      if (event.start.getTime() < end.getTime() && event.end.getTime() > start.getTime()) {
        if (event.start.getTime() < start.getTime()) {
          tmpEvent.start = new Date(start.getTime());
        }
        if (event.end.getTime() > end.getTime()) {
          tmpEvent.end = new Date(end.getTime());
        }
        tmp.push(tmpEvent);
      }
    }
    return tmp;
  }

  getHours() {
    const hours = [];

    let lastDayDate = this.props.start;
    for (let hour = 0; hour < 24; hour ++) {
      lastDayDate = new Date(lastDayDate.getTime());
      hours.push(
        <Hour
          key={`hour_${hour}`}
          events={this.getEvents()}
          onEventChange={this.props.onEventChange}
          onEventClick={this.props.onEventClick}
          onEventContextMenu={this.props.onEventContextMenu}
          time = {lastDayDate}
        />,
      );
      lastDayDate.setHours(hour, 0, 0, 0);
    }
    return hours;
  }

  render() {
    return (
      <div className={theme.day}>
        {this.getHours()}
      </div>
    );
  }
}

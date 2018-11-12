import * as React from 'react';
import Hour from '../Hour';
import * as theme from './theme.scss';


interface IDayProps {
  start: Date;
  events: Event[];
  onEventChange?: () => void;
  onEventClick?: () => void;
  onEventContextMenu?: () => void;
}

interface IDayState {
}

export default class Day extends React.Component<IDayProps, IDayState> {
/*
  @computed get events( ) {
    const tmp = [];
    const start = new Date(this.props.start);
    start.setHours(0, 0, 0, 0);
    const end = new Date(this.props.start);
    end.setHours(23, 59, 59, 99);
    each(this.props.events, (event) => {
      const eventTimeStart = new Date(event.start);
      const eventTimeEnd = new Date(event.end);
      const tmpEvent = cloneDeep(event);
      if (event.start < end.getTime() && event.end > start.getTime()) {
        if (event.start < start.getTime()) {
          tmpEvent.start = start.getTime();
        }
        if (event.end > end.getTime()) {
          tmpEvent.end = end.getTime();
        }
        tmp.push(tmpEvent);
      }
    });
    return tmp;
  }
*/
  getHours() {
    const hours = [];

    let lastDayDate = this.props.start;
    for (let hour = 0; hour < 24; hour ++) {
      lastDayDate = new Date(lastDayDate.getTime());
      hours.push(
        <Hour
          key={`hour_${hour}`}
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

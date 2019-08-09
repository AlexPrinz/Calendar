import * as React from 'react';
import Event from '../event';
import * as theme from './theme.scss';

interface IHourProps {
  onEventChange?: () => void;
  onEventClick?: () => void;
  onEventContextMenu?: () => void;
  events: Calendar.Event[];
  time: Date;
}

interface IHourState {
}

export default class Hour extends React.Component<IHourProps, IHourState> {

  getEvent() {
    for (let i = 0; i < this.props.events.length; i ++) {
      const event = this.props.events[i];
      const tmpDate = new Date(event.start.getTime());
      tmpDate.setHours(tmpDate.getHours(), 0, 0, 0);
      if (tmpDate.getTime() === this.props.time.getTime()) {
        return (
          <Event
            event={event}
            onEventChange={this.props.onEventChange}
            onEventClick={this.props.onEventClick}
            onEventContextMenu={this.props.onEventContextMenu}
            time={this.props.time}
          />
        );
      } else {
        return undefined;
      }
    }
  }

  render() {
    return (
      <div className={theme.hour}>
        {this.getEvent()}
        {this.props.children}
      </div>
    );
  }
}

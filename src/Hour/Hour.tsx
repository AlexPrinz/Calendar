import * as React from 'react';
import * as theme from './theme.scss';


interface IHourProps {
  onEventChange?: () => void;
  onEventClick?: () => void;
  onEventContextMenu?: () => void;
  time: Date;
}

interface IHourState {
}

export default class Hour extends React.Component<IHourProps, IHourState> {

  getEvent() {/*
  return map(this.props.events, (event) => {
      const tmpDate = new Date(event.start);
      tmpDate.setHours(tmpDate.getHours(), 0, 0, 0);
      if (tmpDate.getTime() === this.props.time.getTime()) {
        return (
          <EventDiv
            event={event}
            onEventChange={this.props.onEventChange}
            onEventClick={this.props.onEventClick}
            onContextMenu={this.props.onContextMenu}
            time={this.props.time}
          />
        );
      } else {
        return undefined;
      }
    });*/
    return null;
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

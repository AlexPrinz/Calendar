import * as React from 'react';
import * as theme from './theme.scss';

interface IEventProps {
  event: Calendar.Event;
}

interface IEventState {
}


export default class Event extends React.Component<IEventProps, IEventState> {

  render() {
    return (
      <div className={theme.fullDayEvent}>
        {this.props.event.summary}
      </div>
    );
  }
}

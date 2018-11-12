import * as React from 'react';
import Hour from '../Hour';
import * as theme from './theme.scss';


interface ITimeProps {
}

interface ITimeState {
}

export default class Time extends React.Component<ITimeProps, ITimeState> {

  getTime(hour: number): string {
    if (hour > 0) {
      return `${hour}:00`;
    }
    return null;
  }

  getHours(): JSX.Element[] {
    const hours: JSX.Element[] = [];
    for (let hour = 0; hour < 24; hour ++) {
      hours.push(<div key={`hour_${hour}`} className={theme.hour} >{this.getTime(hour)}</div>);
    }
    return hours;
  }

  render() {
    return (
      <div className={theme.time}>
        {this.getHours()}
      </div>
    );
  }
}

import * as React from 'react';
import { equalDate, getWeekdayDate, nextWeekdayDate } from '../../dateLib';
import * as theme from './theme.scss';

interface IEventProps {
  currentDate: Date;
  event: Calendar.Event;
  firstDayOfWeek: number;
}

interface IEventState {
}


export default class Event extends React.Component<IEventProps, IEventState> {


  getDays(): Object {
    if (this.props.event) {
      const endDayTime = Math.min(
        this.props.event.end.getTime(),
        nextWeekdayDate(this.props.currentDate, this.props.firstDayOfWeek - 1).getTime(),
      );
      const days = (
        (endDayTime -  this.props.currentDate.getTime())
        / (60 * 60 * 24 * 1000)
      ) + 1;

      return {
        '--days': Math.floor(days),
      };
    }
  }



  render() {
    if (
      equalDate(this.props.event.start, this.props.currentDate) ||
      this.props.currentDate.getDay() === this.props.firstDayOfWeek
    ) {
      return (
        <div style={this.getDays()} className={theme.fullDayEvent}>
          {this.props.event.summary}
        </div>
      );
    }
    return null;
  }
}

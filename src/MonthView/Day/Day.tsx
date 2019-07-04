import * as classNames from 'classnames';
import * as React from 'react';
import { equal, isBetweenDate } from '../../dateLib';
import { Event, PlaceHolder } from '../Event';
import * as theme from './theme.scss';


interface IDayProps {
  date: Date;
  currentMonth: number;
  events: Calendar.Event[];
  firstDayOfWeek: number;
}

interface IDayState {
}

export default class Day extends React.Component<IDayProps, IDayState> {


  monthToText = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  getHeader() {
    const day = this.props.date.getDate();
    if (day === 1) {
      return <div className={classNames({
        [theme.today]: equal(this.props.date, new Date()),
      })}>
        {`${day}. ${this.monthToText[this.props.date.getMonth()]}`}
      </div>;
    }
    return <div className={classNames({
      [theme.today]: equal(this.props.date, new Date()),
    })}>
      {day}
    </div>;
  }

  getEvent() {
    const events: JSX.Element[] = [];
    for (let i = 0; i < this.props.events.length; i ++) {
      if (isBetweenDate(this.props.date, this.props.events[i].start, this.props.events[i].end)) {
        events.push(
          <Event
            event={this.props.events[i]}
            firstDayOfWeek={this.props.firstDayOfWeek}
            currentDate={this.props.date}
          />,
        );
      }
    }
    return events;
  }

  render() {
    return (
      <div className={classNames({
        [theme.day]: true,
        [theme.otherMonth]: this.props.date.getMonth() !== this.props.currentMonth,
      })}>
        <div className={theme.header}>{this.getHeader()}</div>
        <div>
          {this.getEvent()}
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import Day from '../Day';
import DayHeader from '../Day/Header';
import Time from '../Time';
import * as theme from './theme.scss';

interface IWeekProps {
  periodChanged?: (start: Date, end: Date, month: string) => void;
  onEventChange?: () => void;
  onEventClick?: () => void;
  onEventContextMenu?: () => void;
  events: Calendar.Event[];
}

interface IWeekState {
}

export default class Week extends React.Component<IWeekProps, IWeekState> {

  todaysDate: Date = new Date( );
  startDate: Date = new Date(Date.now());

  componentWillMount() {
    this.todaysDate = new Date(this.todaysDate.setHours(0, 0, 0, 0));
  }


  dayToText = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
    0: 'Sun',
  };

  monthToText = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };


  componentDidMount() {
    if (typeof this.props.periodChanged === 'function') {
      const { start, end } = this.getPeriod();
      this.props.periodChanged(start, end, this.monthToText[start.getMonth() + 1]);
    }
  }

  getDays() {
    const days = [];
    let lastDayDate = this.setToMonday(this.startDate);
    lastDayDate.setHours(0, 0, 0, 0);
    days.push(<Time/>);
    for (let day = 0; day < 7; day ++) {
      days.push(
        <Day
          key={`day_${day}`}
          events={this.props.events}
          start={new Date(lastDayDate.getTime())}
          onEventChange={this.props.onEventChange}
          onEventClick={this.props.onEventClick}
          onEventContextMenu={this.props.onEventContextMenu}
        />,
      );
      lastDayDate = new Date(lastDayDate.setDate(lastDayDate.getDate() + 1));
    }
    return days;
  }

  getDayHeader() {
    const days = [];
    let lastDayDate = this.setToMonday(this.startDate);
    for (let day = 0; day < 7; day ++) {
      days.push(
        <DayHeader
        key={`day_${day}`}
        today={ this.todaysDate.getTime() === lastDayDate.setHours(0, 0, 0, 0) }
        date={lastDayDate} />);
      lastDayDate = this.addDays(lastDayDate, 1);
    }
    return days;
  }

  setToMonday(date: Date) {
    const _date = new Date(date.getTime());
    _date.setHours(0, 0, 0, 0);
    return this.addDays(_date, 1 - _date.getDay());
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  getPeriod(): {start: Date, end: Date} {
    let end = new Date(this.startDate.getTime());
    end = this.addDays(end, 8);
    end.setMilliseconds(-1);
    return { end, start: new Date(this.startDate.getTime()) };
  }

  addWeek() {
    const tmp = this.addDays(this.startDate, 7);
    this.startDate = new Date(tmp.getTime());
    if (typeof this.props.periodChanged === 'function') {
      const { start, end } = this.getPeriod();
      this.props.periodChanged(start, end, this.monthToText[start.getMonth() + 1]);
    }
  }

  removeWeek() {
    const tmp = this.addDays(this.startDate, -7);
    this.startDate = new Date(tmp.getTime());
    if (typeof this.props.periodChanged === 'function') {
      const { start, end } = this.getPeriod();
      this.props.periodChanged(start, end, this.monthToText[start.getMonth() + 1]);
    }
  }

  render() {
    const tmp = new Date(this.startDate.getTime());
    return (
      <div className={theme.week}>
       <div>
         <div className={theme.header}>
           {this.getDayHeader()}
         </div>
       </div>
       <div className={theme.bodyWrapper}>
         {this.getDays()}
       </div>
     </div>
    );
  }
}

import * as React from 'react';
import { CalendarView, ICalendarViewProps } from '../CalendarView';
import Day from './Day';
import * as theme from './theme.scss';

interface IMonthViewState {
  startDate: Date;
}


export default class MonthView extends React.Component<
  ICalendarViewProps, IMonthViewState
> implements CalendarView  {

  state = {
    startDate: new Date(),
  };

  firstDayOfWeek = this.props.firstDayOfWeek || 1;

  getMonth() {
    const returnValue = [];
    const startDate = this.firstDayOfMonth();
    let date = this.firstDayOfMonth();
    let i = 0;
    do {
      returnValue.push(
        this.getWeek(date, startDate.getMonth()),
      );
      i ++;
      date = new Date(date.setDate(date.getDate() + 7));
    } while (startDate.getMonth() === this.getMonday(date).getMonth());
    return (
      <div style={{ '--weeks-in-month': i } as React.CSSProperties } className={theme.month}>
        {returnValue}
      </div>
    );
  }

  getWeek(startDate: Date, currentMonth: number) {
    return (
      <div className={theme.week}>
        {this.getDaysOfWeek(this.getMonday(startDate), currentMonth)}
      </div>
    );
  }


  firstDayOfMonth(): Date {
    const date = this.state.startDate;
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  getMonday(d) {
    const _d = new Date(d);
    const day = _d.getDay(),
      diff = _d.getDate() - day + (day === 0 ? -6 : this.firstDayOfWeek);
    return new Date(_d.setDate(diff));
  }

  getDaysOfWeek(startDate: Date, currentMonth: number): JSX.Element[] {
    const returnValue: JSX.Element[] = [];
    for (let i = 0; i < 7; i ++) {
      returnValue.push(
        <Day
          firstDayOfWeek={this.firstDayOfWeek}
          events={this.props.events}
          currentMonth={currentMonth}
          date={new Date(startDate.setDate(startDate.getDate() + 0))}
        />,
      );
      startDate.setDate(startDate.getDate() + 1);
    }
    return returnValue;
  }

  public nextPeriod = () => {
    this.setState({startDate: new Date(
      this.state.startDate.getFullYear(),
      this.state.startDate.getMonth() + 1, 1),
    });
  }

  public previousPeriod = () => {
    this.setState({startDate: new Date(
      this.state.startDate.getFullYear(),
      this.state.startDate.getMonth() - 1, 1),
    });
  }


  render() {
    return (
      <div className={theme.wrapper}>
         {this.getMonth()}
     </div>
    );
  }
}

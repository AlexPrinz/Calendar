import * as React from 'react';
import { CalendarView } from './CalendarView';
import MonthView from './MonthView';
import Week from './Week';

interface ICalendarProps {
  getCalendarRef: (calendar: CalendarView) => void;
  periodChanged?: (start: Date, end: Date, month: string) => void;
  onEventChange?: () => void;
  onEventClick?: () => void;
  firstDayOfWeek?: number;
  onEventContextMenu?: () => void;
  events: Calendar.Event[];
  view?: View;
}

interface ICalendarState {
}

export enum View {
  WEEK_VIEW,
  MONTH_VIEW,
}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {


  private _setRef = (ref: CalendarView) => {
    if (typeof this.props.getCalendarRef === 'function') {
      this.props.getCalendarRef(ref);
    }
  }

  getView() {
    if (this.props.view === View.MONTH_VIEW) {
      return (
        <MonthView
          {...this.props}
          ref={this._setRef}
        />
      );
    } else if (this.props.view === View.WEEK_VIEW) {
      return (
        <Week
          {...this.props}
          ref={this._setRef}
        />
      );
    }
    return (
      <MonthView
        {...this.props}
        ref={this._setRef}
      />
    );
  }

  render() {
    return this.getView();
  }
}

export { CalendarView };

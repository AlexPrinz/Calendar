import * as classNames from 'classnames';
import * as React from 'react';
import * as theme from './theme.scss';

interface IDayHeaderProps {
  date: Date;
  today: boolean;
  onEventChange?: () => void;
  onEventClick?: () => void;
  onEventContextMenu?: () => void;
}

interface IDayHeaderState {
}

export default class DayHeader extends React.Component<IDayHeaderProps, IDayHeaderState> {

  dayToText = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
    0: 'Sun',
  };

  render() {
    const date = new Date(this.props.date.getTime());
    return (
      <div className={theme.day}>
        <div className={theme.header}>
          <header className={classNames({ [theme.today]: this.props.today })}>{this.dayToText[date.getDay()]}</header>
          <header className={classNames({ [theme.date]: true, [theme.today]: this.props.today })}>{date.getDate()}</header>
        </div>
      </div>
    );
  }
}

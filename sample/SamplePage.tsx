import * as React from 'react';
import Calendar, { CalendarView }from '../src';

interface ISamplePageProps {
}

interface ISamplePageState {
}

export default class SamplePage extends React.Component<ISamplePageProps, ISamplePageState> {
  ref: CalendarView;

  render () {
    return(
      <div>
        <button onClick = {() => { this.ref.nextPeriod(); }}> next </button>
        <Calendar
          getCalendarRef={ (calendar) => { this.ref = calendar; debugger; }}
          events={ [{
            start: new Date(Date.now()),
            end: new Date(Date.now() + 60 * 60 * 12000),
            summary: 'test',
            description: 'test',
          }]
          }
        />
      </div>
    );
  }
}

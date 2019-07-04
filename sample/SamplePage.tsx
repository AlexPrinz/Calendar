import * as React from 'react';
import Calendar, { CalendarView, View }from '../src';

interface ISamplePageProps {
}

interface ISamplePageState {
  view: View;
}

export default class SamplePage extends React.Component<ISamplePageProps, ISamplePageState> {
  ref: CalendarView;

  state = {
    view: View.MONTH_VIEW,
  };

  render () {
    return(
      <div>
        <button onClick = {() => { this.ref.previousPeriod(); }}> previous </button>
        <button onClick = {() => { this.setState({ view: View.MONTH_VIEW }); }}> Month </button>
        <button onClick = {() => { this.setState({ view: View.WEEK_VIEW }); }}> Week </button>
        <button onClick = {() => { this.ref.nextPeriod(); }}> next </button>

        <Calendar
          getCalendarRef={ (calendar) => { this.ref = calendar; }}
          view={this.state.view}
          events={ [{
            start: new Date(Date.now()),
            end: new Date(Date.now() + 60 * 60 * 25000),
            summary: 'summary 1',
            description: 'description 1',
          }, {
            start: new Date(Date.now() + 60 * 60 * 1000 * 24 * 1.8),
            end: new Date(Date.now() + 60 * 60 * 1000 * 24 * 3),
            summary: 'summary 3',
            description: 'description 3',
          }, {
            start: new Date(Date.now() + 60 * 60 * 1000 * 24 * 1.8),
            end: new Date(Date.now() + 60 * 60 * 1000 * 24 * 3),
            summary: 'summary 4',
            description: 'description 4',
          }, {
            start: new Date(Date.now() + 60 * 60 * 25000),
            end: new Date(Date.now() + 60 * 60 * 200000),
            summary: 'summary 2',
            description: 'description 2',
          }]
          }
        />
      </div>
    );
  }
}

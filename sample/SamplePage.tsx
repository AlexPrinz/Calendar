import * as React from 'react';
import Week from '../src/week';

interface ISamplePageProps {
}

interface ISamplePageState {
}

export default class SamplePage extends React.Component<ISamplePageProps, ISamplePageState> {
  render() {
    return(
      <div>
        <Week
          events={ [{
            start: new Date(Date.now()),
            end: new Date(Date.now() + 60 * 60 * 3000),
            summary: 'test',
            description: 'test',
          }]
          }
        />
      </div>
    );
  }
}

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
          events={[]}
        />
      </div>
    );
  }
}

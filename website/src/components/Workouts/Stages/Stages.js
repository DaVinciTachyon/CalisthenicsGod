import React from 'react';
import StageAdder from './StageAdder';
import StageRow from './StageRow';

export default class Stages extends React.Component {
  constructor() {
    super();
    this.state = {
      stages: [],
    };
  }

  componentDidMount() {
    this.getStages();
  }

  getStages = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/workout/stage/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
      }
    );
    const data = await response.json();
    this.setState({ stages: data.stages });
  };

  render() {
    return (
      <div>
        <StageRow isTitle />
        <StageAdder index={0} />
        {this.state.stages.map((stage, i) => (
          <div key={stage._id}>
            <StageRow
              id={stage._id}
              name={stage.name}
              description={stage.description}
              onUpdate={this.getStages}
            />
            <StageAdder index={i + 1} />
          </div>
        ))}
      </div>
    );
  }
}

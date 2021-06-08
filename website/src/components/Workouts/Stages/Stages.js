import React from 'react';
import StageAdder from './StageAdder';
import StageRow from './StageRow';
import axios from 'axios';

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
    try {
      const { stages } = (await axios.get('/workout/stage/')).data;
      this.setState({ stages });
    } catch (err) {
      if (err.response?.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
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

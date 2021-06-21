import React from 'react';
import StageAdder from './StageAdder';
import StageRow from './StageRow';
import { connect } from 'react-redux';
import { getStages } from '../../../stateManagement/reducers/stages';

class Stages extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getStages();
  }

  render() {
    return (
      <div>
        <StageRow isTitle />
        <StageAdder index={0} />
        {this.props.stages.map((stage, i) => (
          <div key={stage._id}>
            <StageRow
              id={stage._id}
              name={stage.name}
              description={stage.description}
            />
            <StageAdder index={i + 1} />
          </div>
        ))}
      </div>
    );
  }
}

export default connect(({ stages }) => ({ stages }), {
  getStages,
})(Stages);

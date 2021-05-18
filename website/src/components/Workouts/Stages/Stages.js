import React from 'react';
import StageAdder from './StageAdder';
import StageRow from './StageRow';
import { Row, Column } from '../../../style/table';

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
        <Row columns={5}>
          <Column span={5}>
            <StageAdder index={0} />
          </Column>
        </Row>
        {this.state.stages.map((stage, i) => (
          <div key={stage._id}>
            <StageRow
              id={stage._id}
              name={stage.name}
              description={stage.description}
              onUpdate={this.getStages}
            />
            <Row columns={5}>
              <Column span={5}>
                <StageAdder index={i + 1} />
              </Column>
            </Row>
          </div>
        ))}
      </div>
    );
  }
}

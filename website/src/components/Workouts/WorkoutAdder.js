import React from 'react';
import { Row, Column, Title } from '../../style/table';

export default class WorkoutTracker extends React.Component {
  constructor() {
    super();
    this.state = {
      stages: [],
    };
    this.getStages = this.getStages.bind(this);
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
    const stages = [];
    this.state.stages.forEach((stage) => {
      stages.push(
        <div key={stage._id}>
          <Row>{stage.name}</Row>
          <Row>+</Row>
          <Row columns={4}>
            <Column span={4}>exercise</Column>
          </Row>
          <Row>+</Row>
        </div>
      );
    });
    return (
      <div>
        <Title>New Workout</Title>
        <Row columns={4} isTitle>
          <Column>Sets</Column>
          <Column>Type</Column>
          <Column>Exercise</Column>
          <Column>
            <Column>Rest</Column>
            <Row columns={2}>
              <Column>Intraset</Column>
              <Column>Interset</Column>
            </Row>
          </Column>
        </Row>
        {stages}
      </div>
    );
  }
}

// date: "01.01.2021",
// exercises: [
// {
//     _id: 'exerciseId',
//     name: 'pull up',
//     type: {
//     _id: 'motionId',
//     name: 'eccentric'
//     },
//     sets: [
//     {
//         repetitions: 10,
//         time: 10
//     },
//     {
//         repetitions: 8,
//         time: 10
//     }
//     ],
//     rest: {
//     interset: 180,
//     intraset: 180
//     }
// }
// ]

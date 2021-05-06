import React from 'react';
import { Row, Column, Title } from '../../style/table';

export default class Workout extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const stages = [];
    this.props.details.stages.forEach((stage) => {
      const exercises = [];
      stage.exercises.forEach((exercise) => {
        const sets = [];
        exercise.sets.forEach((set) => {
          if (exercise.type.name === 'isotonic')
            sets.push(<Column>{set.repetitions}</Column>);
          else if (exercise.type.name === 'isometric')
            sets.push(<Column>{set.time}s</Column>);
          else
            sets.push(
              <Column>
                {set.repetitions}*{set.time}s
              </Column>
            );
        });
        exercises.push(
          <Row columns={4} key={exercise._id}>
            <Column columns={sets.length}>{sets}</Column>
            <Column key={exercise.type._id}>{exercise.type.name}</Column>
            <Column>{exercise.name}</Column>
            <Column columns={2}>
              <Column>{exercise.rest.intraset}s</Column>
              <Column>{exercise.rest.interset}s</Column>
            </Column>
          </Row>
        );
      });
      stages.push(
        <div key={stage._id}>
          <Row columns={1}>{stage.name}</Row>
          {exercises}
        </div>
      );
    });
    return (
      <div>
        <Title>{this.props.details.date}</Title>
        <Row columns={4} isTitle>
          <Column>Sets</Column>
          <Column>Type</Column>
          <Column>Name</Column>
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

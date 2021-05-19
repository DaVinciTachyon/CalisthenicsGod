import React from 'react';
import { Row, Column, Title } from '../../../style/table';

export default class Workout extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
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
        {this.props.details.stages.map((stage) => (
          <div key={stage._id}>
            <Row columns={1} id={stage.id}>
              {stage.name}
            </Row>
            {stage.exercises.map((exercise) => (
              <Row columns={4} key={exercise._id} id={exercise.id}>
                <Column columns={exercise.sets.length}>
                  {exercise.sets.map((set) => {
                    if (exercise.type === 'isotonic')
                      return <Column>{set.repetitions}</Column>;
                    else if (exercise.type === 'isometric')
                      return <Column>{set.time}s</Column>;
                    else if (exercise.type === 'distance')
                      return (
                        <Column>
                          {set.distance}m in {set.time}s
                        </Column>
                      );
                    else
                      return (
                        <Column>
                          {set.repetitions}*{set.time}s
                        </Column>
                      );
                  })}
                </Column>
                <Column>{exercise.type}</Column>
                <Column>{exercise.name}</Column>
                <Column columns={2}>
                  <Column>{exercise.rest.intraset}s</Column>
                  <Column>{exercise.rest.interset}s</Column>
                </Column>
              </Row>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

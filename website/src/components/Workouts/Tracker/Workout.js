import React from 'react';
import { Row, Column, Title } from '../../../style/table';
import { Number, Text } from '../../../style/inputs';

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
                      return (
                        <Column>
                          <Number value={set.repetitions} unit="r" readOnly />
                        </Column>
                      );
                    else if (exercise.type === 'isometric')
                      return (
                        <Column>
                          <Number value={set.time} unit="s" readOnly />
                        </Column>
                      );
                    else if (exercise.type === 'distance')
                      return (
                        <Column>
                          <Number value={set.distance} unit="m" readOnly />
                          <div>in</div>
                          <Number value={set.time} unit="s" readOnly />
                        </Column>
                      );
                    else
                      return (
                        <Column columns={3}>
                          <Number value={set.repetitions} unit="r" readOnly />
                          <div>*</div>
                          <Number value={set.time} unit="s" readOnly />
                        </Column>
                      );
                  })}
                </Column>
                <Column>
                  <Text value={exercise.type} readOnly />
                </Column>
                <Column>
                  <Text value={exercise.name} readOnly />
                </Column>
                <Column columns={2}>
                  <Column>
                    <Number value={exercise.rest.intraset} unit="s" readOnly />
                  </Column>
                  <Column>
                    <Number value={exercise.rest.interset} unit="s" readOnly />
                  </Column>
                </Column>
              </Row>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

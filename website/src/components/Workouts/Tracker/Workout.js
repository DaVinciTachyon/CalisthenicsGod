import React from 'react';
import { Row, Column, Title } from '../../../style/table';
import { Number, Text } from '../../../style/inputs';
import SetEditor from './SetEditor';

export default class Workout extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Title>{this.props.details.date}</Title>
        <Row columns={5} isTitle>
          <Column>Sets</Column>
          <Column>Weighted</Column>
          <Column>Variation</Column>
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
              <Row columns={5} key={exercise._id} id={exercise.id}>
                <Column>
                  {exercise.sets.map((set, index) => (
                    <SetEditor
                      key={`${exercise._id}-${index}`}
                      value={set}
                      isWeighted={set.weight}
                      readOnly
                    />
                  ))}
                </Column>
                <Text
                  value={
                    exercise.sets[0] && exercise.sets[0].weight
                      ? exercise.sets[0].weight > 0
                        ? 'Weighted'
                        : 'Assisted'
                      : 'Bodyweight'
                  }
                  readOnly
                />
                <Text value={exercise.variation} readOnly />
                <Text value={exercise.name} readOnly />
                <Column columns={2}>
                  {exercise.rest.intraset && (
                    <Number value={exercise.rest.intraset} unit="s" readOnly />
                  )}
                  {!exercise.rest.intraset && <Column />}
                  <Number value={exercise.rest.interset} unit="s" readOnly />
                </Column>
              </Row>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

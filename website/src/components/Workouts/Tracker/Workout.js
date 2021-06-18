import React from 'react';
import { Row, Column, Title } from '../../../style/table';
import { Number, Text } from '../../../style/inputs';
import SetEditor from './SetEditor';
import { connect } from 'react-redux';
import { getExercises } from '../../../stateManagement/reducers/exercises';

class Workout extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getExercises();
  }

  render() {
    return (
      <div>
        <Title>{this.props.details.date}</Title>
        <Row columns={6} isTitle>
          <Column>Sets</Column>
          <Column>Weighted</Column>
          <Column>Variation</Column>
          <Column>Sagittal Plane</Column>
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
            <Row>{stage.name}</Row>
            {stage.exercises.map((exercise) => {
              const fullExercise = this.props.exercises.find(
                (ex) => ex._id === exercise.id
              );
              return (
                <Row columns={6} key={exercise._id} id={exercise.id}>
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
                  <Text
                    value={
                      exercise.variation ||
                      (fullExercise?.motionType.frontalPlane === 'rotational'
                        ? 'Bidirectional'
                        : fullExercise?.motionType.motion === 'isotonic'
                        ? 'Isotonic'
                        : 'Standard')
                    }
                    readOnly
                  />
                  <Text
                    value={exercise.sagittalPlane || 'Bilateral'}
                    readOnly
                  />
                  <Text value={fullExercise?.name} readOnly />
                  <Column columns={2}>
                    {exercise.rest.intraset && (
                      <Number
                        value={exercise.rest.intraset}
                        unit="s"
                        readOnly
                      />
                    )}
                    {!exercise.rest.intraset && <Column />}
                    <Number value={exercise.rest.interset} unit="s" readOnly />
                  </Column>
                </Row>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default connect(({ exercises }) => ({ exercises }), {
  getExercises,
})(Workout);

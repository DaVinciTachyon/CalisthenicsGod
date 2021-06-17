import React from 'react';
import { Row, Title } from '../../../style/table';
import { Button } from '../../../style/buttons';
import ExerciseRow from './ExerciseRow';
import { connect } from 'react-redux';
import {
  addCurrentExercise,
  removeCurrentExercise,
} from '../../../stateManagement/reducers/workouts';

class StageEditor extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  addButton = (index) => (
    <Row>
      <Button
        className="maxWidth thin"
        onClick={() =>
          this.props.addCurrentExercise({
            stageId: this.props.id,
            index,
            currentLength: this.props.details?.exercises.length || 0,
          })
        }
      >
        +
      </Button>
    </Row>
  );

  render() {
    const { name } = this.props.stages.find(
      (stage) => stage._id === this.props.id
    );
    return (
      <div>
        <Row>
          <Title>{name}</Title>
        </Row>
        {this.props.details &&
          this.props.details.exercises.map((exercise, index, exercises) => (
            <ExerciseRow
              key={index}
              stageId={this.props.id}
              index={index}
              onRemove={() =>
                this.props.removeCurrentExercise({
                  stageId: this.props.id,
                  index,
                  currentLength: exercises.length,
                })
              }
            />
          ))}
        {this.addButton(this.props.details?.exercises.length || 0)}
      </div>
    );
  }
}

export default connect(({ stages }) => ({ stages }), {
  addCurrentExercise,
  removeCurrentExercise,
})(StageEditor);

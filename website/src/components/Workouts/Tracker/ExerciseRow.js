import React from 'react';
import { Row, Column } from '../../../style/table';
import ExerciseSelect from '../ExerciseSelect';
import { Select, Number } from '../../../style/inputs';
import { Button, DeleteButton } from '../../../style/buttons';
import SetEditor from './SetEditor';
import { connect } from 'react-redux';
import { setExercises } from '../../../stateManagement/reducers/exercises';
import {
  modifyCurrentExercise,
  addCurrentExerciseSet,
  removeCurrentExerciseSet,
} from '../../../stateManagement/reducers/workouts';

class ExerciseRow extends React.Component {
  constructor() {
    super();
    this.state = {
      sets: [],
      isWeighted: 0,
      variation: undefined,
      variationOptions: this.getVariationOptions(undefined),
      sagittalPlane: undefined,
      id: '',
      exercise: undefined,
      intrasetRest: undefined,
      intersetRest: 0,
    };
  }

  componentDidMount() {
    if (this.props.exercises.length === 0) this.props.setExercises();
    else this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.exercises !== this.props.exercises) this.set();
  }

  set = () => {
    const { sets, variation, sagittalPlane, id, rest } =
      this.props.workouts.current.stages.find(
        (stage) => stage.id === this.props.stageId
      ).exercises[this.props.index];
    const exercise = this.props.exercises.find(
      (exercise) => exercise._id === id
    );
    this.setState({
      isWeighted:
        sets && sets.length > 0
          ? sets[0].weight > 0
            ? 1
            : sets[0].weight < 0
            ? -1
            : 0
          : 0,
      variation,
      sagittalPlane,
      id: id || '',
      intrasetRest: rest?.intraset,
      intersetRest: rest?.interset || 0,
      exercise,
      variationOptions: this.getVariationOptions(
        exercise?.motionType || undefined
      ),
    });
  };

  onUpdate = () => {
    const { variation, sagittalPlane, id, intrasetRest, intersetRest } =
      this.state;
    this.props.modifyCurrentExercise({
      stageId: this.props.stageId,
      index: this.props.index,
      exercise: {
        variation,
        sagittalPlane,
        id,
        rest: { intraset: intrasetRest, interset: intersetRest },
      },
    });
  };

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value });
    this.onUpdate();
  };

  onSelectChange = async (evt) => {
    await this.setState({ [evt.name]: evt.value });
    this.onUpdate();
  };

  getVariationOptions = (motionType) => {
    const variationOptions = [];
    if (motionType?.frontalPlane === 'rotational')
      variationOptions.push(
        { value: undefined, label: 'Bidirectional' },
        { value: 'clockwise', label: 'Clockwise' },
        { value: 'anti-clockwise', label: 'Anti-clockwise' }
      );
    else if (motionType?.motion === 'isotonic')
      variationOptions.push(
        { value: undefined, label: 'Isotonic' },
        { value: 'eccentric', label: 'Eccentric' },
        { value: 'concentric', label: 'Concentric' }
      );
    else variationOptions.push({ value: undefined, label: 'Standard' });
    return variationOptions;
  };

  onExerciseChange = async (evt, exercise) => {
    await this.setState({
      [evt.name]: evt.value,
      exercise,
      isWeighted: 0,
      variation: undefined,
      variationOptions: this.getVariationOptions(
        exercise?.motionType || undefined
      ),
      sagittalPlane:
        exercise?.motionType.sagittalPlane === 'unilateral'
          ? 'right'
          : undefined,
    });
    this.onUpdate();
  };

  render() {
    const sets =
      this.props.workouts.current.stages.find(
        (stage) => stage.id === this.props.stageId
      ).exercises[this.props.index].sets || [];
    return (
      <Row columns={7}>
        <Column>
          {sets.map((set, i) => (
            <SetEditor
              key={i}
              stageId={this.props.stageId}
              exerciseIndex={this.props.index}
              index={i}
              value={set}
              type={this.state.exercise?.motionType.motion}
              variation={this.state.variation}
              isWeighted={this.state.isWeighted}
            />
          ))}
          <Row columns={2}>
            <Button
              className="minWidth"
              onClick={() =>
                this.props.addCurrentExerciseSet({
                  stageId: this.props.stageId,
                  index: this.props.index,
                  newLength: sets.length + 1,
                })
              }
            >
              +
            </Button>
            <DeleteButton
              className="minWidth"
              onClick={() =>
                this.props.removeCurrentExerciseSet({
                  stageId: this.props.stageId,
                  index: this.props.index,
                  newLength: sets.length - 1,
                })
              }
            >
              -
            </DeleteButton>
          </Row>
        </Column>
        <Select
          name="isWeighted"
          options={[
            { label: 'Bodyweight', value: 0 },
            { label: 'Weighted', value: 1 },
            { label: 'Assisted', value: -1 },
          ]}
          value={this.state.isWeighted}
          onChange={this.onSelectChange}
        />
        <Select
          name="variation"
          options={this.state.variationOptions}
          value={this.state.variation}
          onChange={this.onSelectChange}
        />
        <Select
          name="sagittalPlane"
          options={
            this.state.exercise?.motionType.sagittalPlane === 'unilateral'
              ? [
                  { value: 'right', label: 'Right' },
                  { value: 'left', label: 'Left' },
                ]
              : [{ value: undefined, label: 'Bilateral' }]
          }
          value={this.state.sagittalPlane}
          onChange={this.onSelectChange}
        />
        <ExerciseSelect
          name="id"
          stage={this.props.stageId}
          value={this.state.id}
          onChange={this.onExerciseChange}
        />
        <Column columns={2}>
          {this.state.intrasetRest === undefined && <Column />}
          {this.state.intrasetRest !== undefined && (
            <Number
              name="intrasetRest"
              min={0}
              value={this.state.intrasetRest}
              onChange={this.onChange}
              unit="s"
            />
          )}
          <Number
            name="intersetRest"
            min={0}
            value={this.state.intersetRest}
            onChange={this.onChange}
            unit="s"
          />
        </Column>
        <DeleteButton onClick={this.props.onRemove}>Remove</DeleteButton>
      </Row>
    );
  }
}

export default connect(({ workouts, exercises }) => ({ workouts, exercises }), {
  setExercises,
  modifyCurrentExercise,
  addCurrentExerciseSet,
  removeCurrentExerciseSet,
})(ExerciseRow);

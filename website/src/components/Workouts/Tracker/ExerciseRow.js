import React from 'react';
import { Row, Column } from '../../../style/table';
import ExerciseSelect from '../ExerciseSelect';
import { Select, Number } from '../../../style/inputs';
import { Button, DeleteButton } from '../../../style/buttons';
import SetEditor from './SetEditor';

export default class ExerciseRow extends React.Component {
  constructor() {
    super();
    this.state = {
      sets: [],
      variation: undefined,
      id: '',
      intrasetRest: undefined,
      intersetRest: 0,
      exercise: undefined,
      isWeighted: 0,
    };
  }

  componentDidMount() {
    this.onUpdate();
  }

  onUpdate = () =>
    this.props.onUpdate({
      sets: this.state.sets,
      variation: this.state.variation,
      id: this.state.id,
      rest: {
        intraset: this.state.intrasetRest,
        interset: this.state.intersetRest,
      },
    });

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value });
    this.onUpdate();
  };

  onSelectChange = async (evt) => {
    await this.setState({ [evt.name]: evt.value });
    this.onUpdate();
  };

  onExerciseChange = async (evt, exercise) => {
    await this.setState({ [evt.name]: evt.value, exercise });
    this.onUpdate();
  };

  onUpdateSet = async (index, set) => {
    await this.setState((state) => {
      state.sets[index] = set;

      return { sets: state.sets };
    });
    this.onUpdate();
  };

  addSet = async (length) => {
    await this.setState((state) => {
      if (state.sets.length < length + 1) state.sets.push({});
      if (state.sets.length > 1) state.intrasetRest = 0;

      return { sets: state.sets, intrasetRest: state.intrasetRest };
    });
    this.onUpdate();
  };

  removeSet = async (length) => {
    await this.setState((state) => {
      if (state.sets.length > length - 1) state.sets.pop();
      if (state.sets.length <= 1) state.intrasetRest = undefined;

      return { sets: state.sets, intrasetRest: state.intrasetRest };
    });
    this.onUpdate();
  };

  render() {
    const variationOptions = [{ value: undefined, label: 'Default' }];
    if (this.state.exercise?.motionType.frontalPlane === 'rotational')
      variationOptions.push(
        { value: 'clockwise', label: 'Clockwise' },
        { value: 'anti-clockwise', label: 'Anti-clockwise' }
      );
    else if (this.state.exercise?.motionType.motion === 'isotonic')
      variationOptions.push(
        { value: 'eccentric', label: 'Eccentric' },
        { value: 'concentric', label: 'Concentric' }
      );
    return (
      <Row columns={6}>
        <Column>
          {this.state.sets.map((set, i) => (
            <SetEditor
              key={i}
              type={this.state.exercise?.motionType.motion}
              variation={this.state.variation}
              isWeighted={this.state.isWeighted}
              onUpdate={(set) => this.onUpdateSet(i, set)}
            />
          ))}
          <Row columns={2}>
            <Button
              className="minWidth"
              onClick={() => this.addSet(this.state.sets.length)}
            >
              +
            </Button>
            <DeleteButton
              className="minWidth"
              onClick={() => this.removeSet(this.state.sets.length)}
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
          options={variationOptions}
          value={this.state.variation}
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

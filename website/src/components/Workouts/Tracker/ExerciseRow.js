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
      type: undefined,
      id: '',
      intrasetRest: undefined,
      intersetRest: 0,
      exercise: undefined,
    };
  }

  componentDidMount() {
    this.onUpdate();
  }

  onUpdate = () =>
    this.props.onUpdate({
      sets: this.state.sets,
      type: this.state.type,
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
    let type = 'isotonic';
    if (!exercise) type = undefined;
    else if (exercise.motionType.motion === 'distance') type = 'distance';
    else if (exercise.motionType.motion === 'isometric') type = 'isometric';
    await this.setState({ [evt.name]: evt.value, exercise, type });
    this.onUpdate();
  };

  onUpdateSet = async (index, set) => {
    await this.setState((state) => {
      state.sets[index] = set;

      return { sets: state.sets };
    });
    this.onUpdate();
  };

  addSet = (length) =>
    this.setState((state) => {
      if (state.sets.length < length + 1) state.sets.push({});
      if (state.sets.length > 1) state.intrasetRest = 0;

      return { sets: state.sets, intrasetRest: state.intrasetRest };
    });

  removeSet = (length) =>
    this.setState((state) => {
      if (state.sets.length > length - 1) state.sets.pop();
      if (state.sets.length <= 1) state.intrasetRest = undefined;

      return { sets: state.sets, intrasetRest: state.intrasetRest };
    });

  render() {
    const typeOptions = [];
    if (this.state.exercise?.motionType.motion === 'distance')
      typeOptions.push({ value: 'distance', label: 'Distance' });
    else if (this.state.exercise?.motionType.motion === 'isometric')
      typeOptions.push({ value: 'isometric', label: 'Isometric' });
    else
      typeOptions.push(
        { value: 'isotonic', label: 'Isotonic' },
        { value: 'eccentric', label: 'Eccentric' }
      );
    return (
      <Row columns={5}>
        <Column>
          {this.state.sets.map((set, i) => (
            <SetEditor
              key={i}
              type={this.state.type}
              onUpdate={(set) => this.onUpdateSet(i, set)}
            />
          ))}
          <Row columns={2}>
            <Column>
              <Button
                className="minWidth"
                onClick={() => this.addSet(this.state.sets.length)}
              >
                +
              </Button>
            </Column>
            <Column>
              <DeleteButton
                className="minWidth"
                onClick={() => this.removeSet(this.state.sets.length)}
              >
                -
              </DeleteButton>
            </Column>
          </Row>
        </Column>
        <Column>
          <Select
            name="type"
            options={typeOptions}
            value={this.state.type}
            onChange={this.onSelectChange}
          />
        </Column>
        <Column>
          <ExerciseSelect
            name="id"
            stage={this.props.stageId}
            value={this.state.id}
            onChange={this.onExerciseChange}
          />
        </Column>
        <Column columns={2}>
          {this.state.intrasetRest === undefined && <Column />}
          {this.state.intrasetRest !== undefined && (
            <Column>
              <Number
                name="intrasetRest"
                min={0}
                value={this.state.intrasetRest}
                onChange={this.onChange}
                unit="s"
              />
            </Column>
          )}
          <Column>
            <Number
              name="intersetRest"
              min={0}
              value={this.state.intersetRest}
              onChange={this.onChange}
              unit="s"
            />
          </Column>
        </Column>
        <Column>
          <DeleteButton onClick={this.props.onRemove}>Remove</DeleteButton>
        </Column>
      </Row>
    );
  }
}

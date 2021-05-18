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
      type: 'isotonic',
      id: '',
      intrasetRest: 0,
      intersetRest: 0,
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

      return { sets: state.sets };
    });

  removeSet = (length) =>
    this.setState((state) => {
      if (state.sets.length > length - 1) state.sets.pop();

      return { sets: state.sets };
    });

  render() {
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
          <Select //check if isometric vs isotonic
            name="type"
            options={[
              { value: 'isotonic', label: 'Isotonic' },
              { value: 'isometric', label: 'Isometric' },
              { value: 'eccentric', label: 'Eccentric' },
            ]}
            defaultValue={this.state.type}
            onChange={this.onSelectChange}
          />
        </Column>
        <Column>
          <ExerciseSelect
            name="id"
            stage={this.props.stageId}
            onChange={this.onSelectChange}
          />
        </Column>
        <Column columns={2}>
          <Column>
            <Number
              name="intrasetRest"
              min={0}
              value={this.state.intrasetRest}
              onChange={this.onChange}
            />
          </Column>
          <Column>
            <Number
              name="intersetRest"
              min={0}
              value={this.state.intersetRest}
              onChange={this.onChange}
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

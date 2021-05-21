import React from 'react';
import { Select } from '../../style/inputs';

export default class StageSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      stages: [],
    };
  }

  componentDidMount() {
    this.getWorkoutStages();
  }

  getWorkoutStages = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/workout/stage/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
      }
    );
    const data = await response.json();
    this.setState({ stages: data.stages });
  };

  onChange = async (evt) => {
    const stages = this.state.stages.filter((stage) => {
      if (this.props.isMulti) return evt.value.includes(stage._id);
      return evt.value === stage._id;
    });
    this.props.onChange(evt, this.props.isMulti ? stages : stages[0]);
  };

  render() {
    return (
      <Select
        options={(this.props.isMulti
          ? []
          : [{ label: 'Choose Stage', value: '' }]
        ).concat(
          this.state.stages.map((stage) => {
            return { label: stage.name, value: stage._id };
          })
        )}
        name={this.props.name}
        onChange={this.onChange}
        value={this.props.value}
        isMulti={this.props.isMulti}
        readOnly={this.props.readOnly}
      />
    );
  }
}

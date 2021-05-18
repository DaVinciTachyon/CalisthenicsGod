import React from 'react';
import { Select } from '../../style/inputs';

export default class StageSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      stages: [],
      stageOptions: [],
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
    const stages = [];
    data.stages.forEach((stage) =>
      stages.push({ label: stage.name, value: stage._id })
    );
    this.setState({ stageOptions: stages });
  };

  onChange = async (evt) => {
    await this.setState({ [evt.name]: evt.value });
    this.props.onChange(evt);
  };

  render() {
    return (
      <Select
        options={[{ label: 'Choose Stage', value: '' }].concat(
          this.state.stageOptions
        )}
        name={this.props.name || 'stages'}
        onChange={this.onChange}
        defaultValue={this.props.defaultValue}
        isMulti={this.props.isMulti}
        readOnly={this.props.readOnly}
      />
    );
  }
}

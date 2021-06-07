import React from 'react';
import { Select } from '../../style/inputs';
import axios from 'axios';

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
    try {
      const { stages } = await axios.get('/workout/stage/');
      this.setState({ stages });
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  onChange = async (evt) => {
    const stages = this.state.stages.filter((stage) => {
      if (this.props.isMulti) return evt.value.includes(stage._id);
      return evt.value === stage._id;
    });
    this.props.onChange(evt, this.props.isMulti ? stages : stages[0]);
  };

  render() {
    const { isMulti, onChange, ...rest } = this.props;
    return (
      <Select
        options={(isMulti ? [] : [{ label: 'Choose Stage', value: '' }]).concat(
          this.state.stages.map((stage) => {
            return { label: stage.name, value: stage._id };
          })
        )}
        onChange={this.onChange}
        isMulti={isMulti}
        {...rest}
      />
    );
  }
}

import React from 'react';
import { Select } from '../../style/inputs';
import { Button } from '../../style/buttons';
import { Row } from '../../style/table';
import { setPresetMeals } from '../../stateManagement/reducers/presetMeals';
import { connect } from 'react-redux';

class MealSelect extends React.Component {
  constructor() {
    super();
    this.state = { id: '' };
  }

  componentDidMount() {
    if (this.props.presetMeals.length === 0) this.props.setPresetMeals();
  }

  render() {
    const { value, onChange, onSubmit, ...rest } = this.props;
    return (
      <Row columns={2}>
        <Select
          options={[{ label: 'New Meal', value: '' }].concat(
            this.props.presetMeals.map((meal) => ({
              label: meal.name,
              value: meal._id,
            }))
          )}
          value={this.state.id}
          onChange={(evt) => this.setState({ id: evt.value })}
          {...rest}
        />
        <Button onClick={() => onSubmit(this.state.id)}>Select</Button>
      </Row>
    );
  }
}

export default connect(({ presetMeals }) => ({ presetMeals }), {
  setPresetMeals,
})(MealSelect);

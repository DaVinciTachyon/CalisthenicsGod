import React from 'react'
import { Select } from '../../style/inputs'
import { Button } from '../../style/buttons'
import { Row } from '../../style/table'
import { getPresetMeals } from '../../stateManagement/reducers/presetMeals'
import { connect } from 'react-redux'

class MealSelect extends React.Component {
  constructor() {
    super()
    this.state = { id: '' }
  }

  componentDidMount() {
    if (this.props.presetMeals.length === 0) this.props.getPresetMeals()
  }

  render() {
    const { value, onChange, onSubmit, ...rest } = this.props
    return (
      <Row columns={2}>
        <Select
          searchable
          options={[{ label: 'New Meal', value: 'default' }].concat(
            this.props.presetMeals.map((meal) => ({
              label: meal.name,
              value: meal._id,
            })),
          )}
          value={this.state.id}
          onChange={(evt) =>
            this.setState({
              id: evt.target.value === 'default' ? '' : evt.target.value,
            })
          }
          {...rest}
        />
        <Button onClick={() => onSubmit(this.state.id)}>Select</Button>
      </Row>
    )
  }
}

export default connect(({ presetMeals }) => ({ presetMeals }), {
  getPresetMeals,
})(MealSelect)

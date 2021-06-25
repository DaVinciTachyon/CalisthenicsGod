import React from 'react'
import { Row } from '../../../style/table'
import { Button, ErrorButton } from '../../../style/buttons'
import { Text } from '../../../style/inputs'
import { addPresetMeal } from '../../../stateManagement/reducers/presetMeals'
import { connect } from 'react-redux'
import { ButtonGroup } from '@material-ui/core'

class MealAdder extends React.Component {
  constructor() {
    super()
    this.state = { isAdding: false, name: '' }
  }

  set = () => this.setState({ isAdding: false, name: '' })

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value })

  render() {
    if (this.state.isAdding)
      return (
        <Row columns={2}>
          <Text name="name" value={this.state.name} onChange={this.onChange} />
          <ButtonGroup orientation="vertical">
            <Button
              onClick={() => {
                this.props.addPresetMeal({
                  name: this.state.name,
                  ingredients: [],
                })
                this.set()
              }}
            >
              Add
            </Button>
            <ErrorButton onClick={this.set}>Cancel</ErrorButton>
          </ButtonGroup>
        </Row>
      )
    return (
      <Button onClick={() => this.setState({ isAdding: true })} fullWidth>
        Add
      </Button>
    )
  }
}

export default connect(() => ({}), {
  addPresetMeal,
})(MealAdder)

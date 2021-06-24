import React from 'react'
import { Row, Column } from '../../../style/table'
import {
  Text,
  Calories,
  Weight,
  Fat,
  Carbohydrate,
  Protein,
  Ethanol,
} from '../../../style/inputs'
import {
  Button,
  SuccessButton,
  ErrorButton,
  DeleteButton,
} from '../../../style/buttons'
import { getCalories } from '../util'
import { connect } from 'react-redux'
import {
  changeAvailability,
  patchIngredient,
} from '../../../stateManagement/reducers/ingredients'
import { ButtonGroup } from '@material-ui/core'

class IngredientRow extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      weight: 100,
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
      name: '',
      calories: 0,
    }
  }

  componentDidMount() {
    if (!this.props.isTitle) this.setMacros()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && !this.props.isTitle) this.setMacros()
  }

  setMacros = async () => {
    const { name, macronutrients } = this.props
    const { fat, carbohydrate, protein, ethanol } = macronutrients
    this.setState({
      name,
      fat,
      carbohydrate,
      protein,
      ethanol,
      calories: await getCalories(
        fat,
        carbohydrate,
        protein,
        ethanol,
        this.state.weight,
      ),
    })
  }

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value })
    this.setState({
      calories: await getCalories(
        this.state.fat,
        this.state.carbohydrate,
        this.state.protein,
        this.state.ethanol,
        this.state.weight,
      ),
    })
  }

  onSubmit = async () => {
    const { name, fat, carbohydrate, protein, ethanol } = this.state
    this.props.patchIngredient({
      _id: this.props.id,
      name,
      macronutrients: {
        fat,
        carbohydrate,
        protein,
        ethanol,
      },
    })
    this.setState({ isEditing: false })
  }

  render() {
    const { isTitle, isAvailable } = this.props
    const {
      isEditing,
      name,
      weight,
      fat,
      carbohydrate,
      protein,
      ethanol,
    } = this.state
    if (isTitle)
      return (
        <Row columns={9} isTitle>
          <Column span={2} />
          <Column>Calories</Column>
          <Column>Weight</Column>
          <Column>Fat</Column>
          <Column>Carbs</Column>
          <Column>Protein</Column>
          <Column>Ethanol</Column>
          <Column />
        </Row>
      )
    return (
      <Row columns={9}>
        <Column span={2}>
          <Text
            name="name"
            onChange={this.onChange}
            value={name}
            disabled={!isEditing}
          />
        </Column>
        <Calories value={this.state.calories} disabled />
        <Weight value={weight} disabled />
        <Fat
          name="fat"
          onChange={this.onChange}
          value={fat}
          disabled={!isEditing}
        />
        <Carbohydrate
          name="carbohydrate"
          onChange={this.onChange}
          value={carbohydrate}
          disabled={!isEditing}
        />
        <Protein
          name="protein"
          onChange={this.onChange}
          value={protein}
          disabled={!isEditing}
        />
        <Ethanol
          name="ethanol"
          onChange={this.onChange}
          value={ethanol}
          disabled={!isEditing}
        />
        {!isEditing && (
          <ButtonGroup orientation="vertical">
            <Button onClick={() => this.setState({ isEditing: true })}>
              Edit
            </Button>
            {isAvailable && (
              <DeleteButton
                onClick={() =>
                  this.props.changeAvailability({
                    _id: this.props.id,
                    isAvailable,
                  })
                }
              >
                Unavailable
              </DeleteButton>
            )}
            {!isAvailable && (
              <SuccessButton
                onClick={() =>
                  this.props.changeAvailability({
                    _id: this.props.id,
                    isAvailable,
                  })
                }
              >
                Available
              </SuccessButton>
            )}
          </ButtonGroup>
        )}
        {isEditing && (
          <div>
            <SuccessButton className="primary" onClick={this.onSubmit}>
              Submit
            </SuccessButton>
            <ErrorButton
              onClick={() => {
                this.setMacros()
                this.setState({ isEditing: false })
              }}
            >
              Cancel
            </ErrorButton>
          </div>
        )}
      </Row>
    )
  }
}

export default connect(() => ({}), {
  changeAvailability,
  patchIngredient,
})(IngredientRow)

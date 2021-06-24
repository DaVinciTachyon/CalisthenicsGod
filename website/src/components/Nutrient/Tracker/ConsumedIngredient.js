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
  modifyIngredient,
  removeIngredient,
} from '../../../stateManagement/reducers/meals'
import { getIngredients } from '../../../stateManagement/reducers/ingredients'
import { ButtonGroup } from '@material-ui/core'

class ConsumedIngredient extends React.Component {
  constructor() {
    super()
    this.state = {
      weight: 0,
      isEditing: false,
      calories: 0,
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
      name: '',
    }
  }

  async componentDidMount() {
    if (!this.props.isTitle) {
      await this.getDetails()
      this.setWeight()
    }
    this.props.getIngredients()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ingredients !== this.props.ingredients) this.getDetails()
  }

  setWeight = async () => {
    const weight = this.props.meals
      .find((meal) => meal._id === this.props.mealId)
      .ingredients.find(
        (ingredient) => ingredient._id === this.props.ingredient._id,
      ).weight
    this.setState({
      weight,
      calories: await getCalories(
        this.state.fat,
        this.state.carbohydrate,
        this.state.protein,
        this.state.ethanol,
        weight,
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

  getDetails = async () => {
    const { name, macronutrients } = this.props.ingredients.find(
      (ingredient) => ingredient._id === this.props.ingredient.id,
    ) || {
      name: '',
      macronutrients: { fat: 0, carbohydrate: 0, protein: 0, ethanol: 0 },
    }
    this.setState({
      name,
      fat: macronutrients.fat,
      carbohydrate: macronutrients.carbohydrate,
      protein: macronutrients.protein,
      ethanol: macronutrients.ethanol,
      calories: await getCalories(
        macronutrients.fat,
        macronutrients.carbohydrate,
        macronutrients.protein,
        macronutrients.ethanol,
        this.state.weight,
      ),
    })
  }

  render() {
    const { isTitle } = this.props
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
    const {
      isEditing,
      weight,
      name,
      fat,
      carbohydrate,
      protein,
      ethanol,
      calories,
    } = this.state
    return (
      <Row columns={9}>
        <Column span={2}>
          <Text value={name} disabled />
        </Column>
        <Calories value={calories} disabled />
        <Weight
          value={weight}
          disabled={!isEditing}
          name="weight"
          onChange={this.onChange}
        />
        <Fat value={(fat * weight) / 100} disabled />
        <Carbohydrate value={(carbohydrate * weight) / 100} disabled />
        <Protein value={(protein * weight) / 100} disabled />
        <Ethanol value={(ethanol * weight) / 100} disabled />
        {!isEditing && (
          <ButtonGroup orientation="vertical">
            <Button onClick={() => this.setState({ isEditing: true })}>
              Edit
            </Button>
            <DeleteButton
              onClick={() => {
                this.props.removeIngredient({
                  _id: this.props.mealId,
                  ingredient: { _id: this.props.ingredient._id },
                })
                this.setState({ isEditing: false })
              }}
            >
              Remove
            </DeleteButton>
          </ButtonGroup>
        )}
        {isEditing && (
          <ButtonGroup orientation="vertical">
            <SuccessButton
              onClick={() => {
                this.props.modifyIngredient({
                  _id: this.props.mealId,
                  ingredient: {
                    _id: this.props.ingredient._id,
                    weight,
                  },
                })
                this.setState({ isEditing: false })
              }}
            >
              Submit
            </SuccessButton>
            <ErrorButton
              onClick={() => {
                this.setState({ isEditing: false })
                this.setWeight()
              }}
            >
              Cancel
            </ErrorButton>
          </ButtonGroup>
        )}
      </Row>
    )
  }
}

export default connect(({ ingredients, meals }) => ({ ingredients, meals }), {
  modifyIngredient,
  removeIngredient,
  getIngredients,
})(ConsumedIngredient)

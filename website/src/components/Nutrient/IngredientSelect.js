import React from 'react'
import { Select } from '../../style/inputs'
import { connect } from 'react-redux'
import { getIngredients } from '../../stateManagement/reducers/ingredients'

class IngredientSelect extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getIngredients()
  }

  onChange = (evt) =>
    this.props.onChange(
      this.props.ingredients
        .filter((ingredient) => ingredient.isAvailable)
        .filter((ingredient) => evt.target.value === ingredient._id)[0],
    )

  render() {
    const { name, onChange, ...rest } = this.props
    return (
      <Select
        name={name || 'ingredient'}
        options={[{ label: 'New Ingredient', value: '' }].concat(
          this.props.ingredients
            .filter((ingredient) => ingredient.isAvailable)
            .map((ingredient) => {
              return { label: ingredient.name, value: ingredient._id }
            }),
        )}
        onChange={this.onChange}
        {...rest}
      />
    )
  }
}

export default connect(({ ingredients }) => ({ ingredients }), {
  getIngredients,
})(IngredientSelect)

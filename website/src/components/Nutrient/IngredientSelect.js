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

  onChange = (evt) => {
    const ingredients = this.props.ingredients.filter((ingredient) => {
      if (this.props.multiple) return evt.target.value.includes(ingredient._id)
      return evt.target.value === ingredient._id
    })
    this.props.onChange(this.props.multiple ? ingredients : ingredients[0])
  }

  render() {
    const { onChange, ...rest } = this.props
    return (
      <Select
        searchable
        options={this.props.ingredients
          .filter((ingredient) => ingredient.isAvailable)
          .map((ingredient) => ({
            label: ingredient.name,
            value: ingredient._id,
          }))}
        onChange={this.onChange}
        {...rest}
      />
    )
  }
}

export default connect(({ ingredients }) => ({ ingredients }), {
  getIngredients,
})(IngredientSelect)

import React from 'react'
import { Select } from '../../style/inputs'
import { connect } from 'react-redux'
import { getStages } from '../../stateManagement/reducers/stages'

class StageSelect extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getStages()
  }

  onChange = async (evt) => {
    const stages = this.props.stages.filter((stage) => {
      if (this.props.isMulti) return evt.target.value.includes(stage._id)
      return evt.value === stage._id
    })
    this.props.onChange(evt, this.props.isMulti ? stages : stages[0])
  }

  render() {
    const { isMulti, onChange, ...rest } = this.props
    return (
      <Select
        options={(isMulti ? [] : [{ label: 'Choose Stage', value: '' }]).concat(
          this.props.stages.map((stage) => {
            return { label: stage.name, value: stage._id }
          }),
        )}
        onChange={this.onChange}
        isMulti={isMulti}
        {...rest}
      />
    )
  }
}

export default connect(({ stages }) => ({ stages }), {
  getStages,
})(StageSelect)

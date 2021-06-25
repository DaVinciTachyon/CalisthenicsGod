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
      if (this.props.multiple) return evt.target.value.includes(stage._id)
      return evt.target.value === stage._id
    })
    this.props.onChange(evt, this.props.multiple ? stages : stages[0])
  }

  render() {
    const { onChange, ...rest } = this.props
    return (
      <Select
        searchable
        options={this.props.stages.map((stage) => ({
          label: stage.name,
          value: stage._id,
        }))}
        onChange={this.onChange}
        {...rest}
      />
    )
  }
}

export default connect(({ stages }) => ({ stages }), {
  getStages,
})(StageSelect)

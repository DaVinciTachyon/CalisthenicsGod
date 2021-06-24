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
    const { multiple, onChange, ...rest } = this.props
    return (
      <Select
        options={(multiple
          ? []
          : [{ label: 'Choose Stage', value: '' }]
        ).concat(
          this.props.stages.map((stage) => {
            return { label: stage.name, value: stage._id }
          }),
        )}
        onChange={this.onChange}
        multiple={multiple}
        {...rest}
      />
    )
  }
}

export default connect(({ stages }) => ({ stages }), {
  getStages,
})(StageSelect)

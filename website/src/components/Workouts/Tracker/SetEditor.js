import React from 'react'
import { Row } from '../../../style/table'
import { Number } from '../../../style/inputs'

export default class SetEditor extends React.Component {
  constructor() {
    super()
    this.state = {
      repetitions: undefined,
      time: undefined,
      distance: undefined,
      weight: undefined,
    }
  }

  componentDidMount() {
    this.setParams()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.type !== this.props.type ||
      prevProps.isWeighted !== this.props.isWeighted
    )
      this.setParams()
  }

  setParams = async () => {
    let repetitions, time, distance, weight
    if (
      this.props.value?.repetitions ||
      ['isotonic', 'eccentric'].includes(this.props.type) ||
      (!this.props.type && !this.props.disabled)
    )
      repetitions = this.props.value?.repetitions || 1
    if (
      this.props.value?.time ||
      ['isometric', 'eccentric', 'distance', 'timed'].includes(this.props.type)
    )
      time = this.props.value?.time || 1
    if (this.props.value?.distance || ['distance'].includes(this.props.type))
      distance = this.props.value?.distance || 1
    if (this.props.isWeighted && this.props.isWeighted !== 0)
      weight = this.props.value?.weight ? Math.abs(this.props.value.weight) : 1
    await this.setState({ repetitions, time, distance, weight })
    if (!this.props.disabled) this.props.onChange(this.state)
  }

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value })
    this.props.onChange(this.state)
  }

  render() {
    return (
      <Row
        columns={
          Object.keys(this.state).filter((key) => this.state[key] !== undefined)
            .length
        }
      >
        {this.state.repetitions !== undefined && (
          <Number
            name="repetitions"
            min={1}
            value={this.state.repetitions}
            onChange={this.onChange}
            unit="r"
          />
        )}
        {this.state.distance !== undefined && (
          <Number
            name="distance"
            min={1}
            value={this.state.distance}
            onChange={this.onChange}
            unit="m"
          />
        )}
        {this.state.time !== undefined && (
          <Number
            name="time"
            min={1}
            value={this.state.time}
            onChange={this.onChange}
            unit="s"
          />
        )}
        {this.state.weight !== undefined && (
          <Number
            name="weight"
            min={0.1}
            value={this.state.weight}
            onChange={this.onChange}
            unit="kg"
          />
        )}
      </Row>
    )
  }
}

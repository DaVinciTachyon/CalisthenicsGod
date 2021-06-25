import React from 'react'
import { Row, Column } from '../../../style/table'
import { Button, ErrorButton } from '../../../style/buttons'
import { Text } from '../../../style/inputs'
import { connect } from 'react-redux'
import { addStage } from '../../../stateManagement/reducers/stages'
import { ButtonGroup } from '@material-ui/core'

class StageAdder extends React.Component {
  constructor() {
    super()
    this.state = {
      isAdding: false,
      name: '',
      description: '',
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  set = () =>
    this.setState({
      isAdding: false,
      name: '',
      description: '',
    })

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value })

  onSubmit = async () => {
    if (!this.state.name) return this.setState({ error: 'Name is required' })
    if (this.props.index < 0 || this.props.index % 1 !== 0)
      return this.setState({ error: 'Chronological Ranking is invalid' })
    this.props.addStage({
      name: this.state.name,
      description: this.state.description,
      chronologicalRanking: this.props.index,
    })
    this.set()
  }

  render() {
    if (!this.state.isAdding)
      return (
        <Button
          onClick={() => this.setState({ isAdding: true })}
          className="thin"
          fullWidth
        >
          +
        </Button>
      )
    else
      return (
        <>
          <Row columns={5}>
            <Column span={2}>
              <Text
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </Column>
            <Column span={2}>
              <Text
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
            </Column>
            <ButtonGroup orientation="vertical">
              <Button onClick={this.onSubmit}>Submit</Button>
              <ErrorButton onClick={this.set}>Cancel</ErrorButton>
            </ButtonGroup>
          </Row>
        </>
      )
  }
}

export default connect(() => ({}), {
  addStage,
})(StageAdder)

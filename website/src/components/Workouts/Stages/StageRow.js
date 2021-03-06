import React from 'react'
import { Row, Column } from '../../../style/table'
import { Text } from '../../../style/inputs'
import {
  Button,
  SuccessButton,
  ErrorButton,
  // DeleteButton,
} from '../../../style/buttons'
import { connect } from 'react-redux'
import {
  removeStage,
  modifyStage,
} from '../../../stateManagement/reducers/stages'
import { ButtonGroup } from '@material-ui/core'

class StageRow extends React.Component {
  constructor() {
    super()
    this.state = { name: '', description: '', isEditing: false }
  }

  componentDidMount() {
    this.set()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.set()
  }

  set = () =>
    this.setState({
      isEditing: false,
      name: this.props.name,
      description: this.props.description,
    })

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value })

  onSubmit = () => {
    this.props.modifyStage({
      _id: this.props.id,
      name: this.state.name,
      description: this.state.description,
    })
    this.set()
  }

  render() {
    return (
      <Row columns={5}>
        <Column span={2}>
          <Text
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            disabled={!this.state.isEditing}
            fullWidth
            label="Name"
          />
        </Column>
        <Column span={2}>
          <Text
            name="description"
            onChange={this.onChange}
            value={this.state.description}
            disabled={!this.state.isEditing}
            fullWidth
            multiline
            label="Description"
          />
        </Column>
        {!this.state.isEditing && (
          <ButtonGroup orientation="vertical">
            <Button onClick={() => this.setState({ isEditing: true })}>
              Edit
            </Button>
            {/* <DeleteButton onClick={() => this.props.removeStage(this.props.id)}>
              Remove
            </DeleteButton> */}
          </ButtonGroup>
        )}
        {this.state.isEditing && (
          <ButtonGroup orientation="vertical">
            <SuccessButton onClick={this.onSubmit}>Submit</SuccessButton>
            <ErrorButton onClick={this.set}>Cancel</ErrorButton>
          </ButtonGroup>
        )}
      </Row>
    )
  }
}

export default connect(() => ({}), {
  removeStage,
  modifyStage,
})(StageRow)

import React from 'react';
import { Row, Column } from '../../style/table';
import { Text } from '../../style/inputs';
import {
  Button,
  SuccessButton,
  ErrorButton,
  DeleteButton,
} from '../../style/buttons';

export default class StageRow extends React.Component {
  constructor() {
    super();
    this.state = { name: '', description: '', isEditing: false };
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.set();
  }

  set = () =>
    this.setState({
      isEditing: false,
      name: this.props.name,
      description: this.props.description,
    });

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSubmit = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/workout/stage/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        _id: this.props.id,
        name: this.state.name,
        description: this.state.description,
      }),
    });
    await this.set();
    this.props.onUpdate();
  };

  onRemove = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/workout/stage/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        _id: this.props.id,
      }),
    });
    await this.set();
    this.props.onUpdate();
  };

  render() {
    if (this.props.isTitle)
      return (
        <Row columns={5} isTitle>
          <Column span={2}>Name</Column>
          <Column span={2}>Description</Column>
          <Column />
        </Row>
      );
    return (
      <Row columns={5}>
        <Column span={2}>
          <Text
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            readOnly={!this.state.isEditing}
          />
        </Column>
        <Column span={2}>
          <Text
            name="description"
            onChange={this.onChange}
            value={this.state.description}
            readOnly={!this.state.isEditing}
          />
        </Column>
        <Column>
          {!this.state.isEditing && (
            <>
              <Button onClick={() => this.setState({ isEditing: true })}>
                Edit
              </Button>
              <DeleteButton onClick={this.onRemove}>Remove</DeleteButton>
            </>
          )}
          {this.state.isEditing && (
            <>
              <SuccessButton onClick={this.onSubmit}>Submit</SuccessButton>
              <ErrorButton onClick={this.set}>Cancel</ErrorButton>
            </>
          )}
        </Column>
      </Row>
    );
  }
}

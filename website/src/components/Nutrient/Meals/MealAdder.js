import React from 'react';
import { Row, Column } from '../../../style/table';
import { Button, ErrorButton } from '../../../style/buttons';
import { Text } from '../../../style/inputs';

export default class MealAdder extends React.Component {
  constructor() {
    super();
    this.state = { isAdding: false, name: '' };
  }

  set = () => this.setState({ isAdding: false, name: '' });

  onSubmit = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/nutrition/meals/preset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        name: this.state.name,
        ingredients: [],
      }),
    });
    this.set();
    this.props.onSubmit();
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    if (this.state.isAdding)
      return (
        <Row columns={8}>
          <Column span={4}>
            <Text
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Column>
          <Column span={4}>
            <Button onClick={this.onSubmit}>Add</Button>
            <ErrorButton onClick={this.set}>Cancel</ErrorButton>
          </Column>
        </Row>
      );
    return (
      <Row columns={8}>
        <Column span={8}>
          <Button
            className="maxWidth"
            onClick={() => this.setState({ isAdding: true })}
          >
            Add
          </Button>
        </Column>
      </Row>
    );
  }
}

import React from 'react';
import { Row, Column } from '../../../style/table';
import { Button, ErrorButton } from '../../../style/buttons';
import { Text } from '../../../style/inputs';
import axios from 'axios';

export default class MealAdder extends React.Component {
  constructor() {
    super();
    this.state = { isAdding: false, name: '' };
  }

  set = () => this.setState({ isAdding: false, name: '' });

  onSubmit = async () => {
    try {
      await axios.post('/nutrition/meals/preset/', {
        name: this.state.name,
        ingredients: [],
      });
      this.set();
      this.props.onSubmit();
    } catch (err) {
      if (err.response?.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    if (this.state.isAdding)
      return (
        <Row columns={2}>
          <Text name="name" value={this.state.name} onChange={this.onChange} />
          <Column>
            <Button onClick={this.onSubmit}>Add</Button>
            <ErrorButton onClick={this.set}>Cancel</ErrorButton>
          </Column>
        </Row>
      );
    return (
      <Button
        className="maxWidth"
        onClick={() => this.setState({ isAdding: true })}
      >
        Add
      </Button>
    );
  }
}

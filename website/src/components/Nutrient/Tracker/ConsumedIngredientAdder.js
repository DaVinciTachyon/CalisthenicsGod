import React from 'react';
import { Button } from '../../../style/buttons';
import { Row, Column } from '../../../style/table';
import MealIngredientAdder from './MealIngredientAdder';

export default class ConsumedIngredientAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
    };
  }

  render() {
    if (this.state.isAdding)
      return (
        <MealIngredientAdder
          id={this.props.id}
          onSubmit={() => {
            this.setState({ isAdding: false });
            this.props.onUpdate();
          }}
          onCancel={() => this.setState({ isAdding: false })}
          macroDensities={this.props.macroDensities}
        />
      );
    return (
      <Row>
        <Column>
          <Button onClick={() => this.setState({ isAdding: true })}>Add</Button>
        </Column>
      </Row>
    );
  }
}

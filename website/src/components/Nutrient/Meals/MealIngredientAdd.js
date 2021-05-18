import React from 'react';
import { Row, Column } from '../../../style/table';
import { Button } from '../../../style/buttons';
import MealIngredientAdder from '../Tracker/MealIngredientAdder';

export default class MealIngredientAdd extends React.Component {
  constructor() {
    super();
    this.state = { isAdding: false };
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
          isPreset
        />
      );
    return (
      <Row columns={8}>
        <Column span={8}>
          <Button
            className="maxWidth thin"
            onClick={() => this.setState({ isAdding: true })}
          >
            Add
          </Button>
        </Column>
      </Row>
    );
  }
}

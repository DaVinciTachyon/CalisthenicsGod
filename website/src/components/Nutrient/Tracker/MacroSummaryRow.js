import React from 'react';
import { Row, Column } from '../../../style/table';
import {
  Text,
  Calories,
  Fat,
  Carbohydrate,
  Protein,
  Ethanol,
} from '../../../style/inputs';
import { getCalories } from '../util';

export default class MacroSummaryRow extends React.Component {
  constructor() {
    super();
    this.state = {
      calories: 0,
    };
  }

  componentDidMount() {
    this.setCalories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.setCalories();
  }

  setCalories = async () =>
    this.setState({
      calories: await getCalories(
        this.props.fat,
        this.props.carbohydrate,
        this.props.protein,
        this.props.ethanol
      ),
    });

  render() {
    if (this.props.isTitle)
      return (
        <Row columns={7} isTitle>
          <Column span={2} />
          <Column>Calories</Column>
          <Column>Fat</Column>
          <Column>Carbs</Column>
          <Column>Protein</Column>
          <Column>Ethanol</Column>
        </Row>
      );
    return (
      <Row columns={7} className="emphasis">
        <Column span={2}>
          <Text value={this.props.name} readOnly />
        </Column>
        <Calories value={this.state.calories} readOnly />
        <Fat value={this.props.fat} readOnly />
        <Carbohydrate value={this.props.carbohydrate} readOnly />
        <Protein value={this.props.protein} readOnly />
        <Ethanol value={this.props.ethanol} readOnly />
      </Row>
    );
  }
}

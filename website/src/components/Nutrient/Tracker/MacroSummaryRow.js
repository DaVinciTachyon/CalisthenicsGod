import React from 'react';
import { Row, Column, Subtitle } from '../../../style/table';
import {
  Calories,
  Fat,
  Carbohydrate,
  Protein,
  Ethanol,
} from '../../../style/inputs';

export default class MacroSummaryRow extends React.Component {
  getCalories = () =>
    this.props.fat * this.props.macroDensities.fat +
    this.props.carbohydrate * this.props.macroDensities.carbohydrate +
    this.props.protein * this.props.macroDensities.protein +
    this.props.ethanol * this.props.macroDensities.ethanol;

  render() {
    if (this.props.isTitle)
      return (
        <Row columns={7} isTitle>
          <Column span={2} />
          <Column>
            <div>Calories</div>
            <Subtitle>kcal</Subtitle>
          </Column>
          <Column>
            <div>Fat</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column>
            <div>Carbs</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column>
            <div>Protein</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column>
            <div>Ethanol</div>
            <Subtitle>grams</Subtitle>
          </Column>
        </Row>
      );
    return (
      <Row columns={7} className="emphasis">
        <Column span={2}>{this.props.name}</Column>
        <Column>
          <Calories value={this.getCalories()} readOnly />
        </Column>
        <Column>
          <Fat value={this.props.fat} readOnly />
        </Column>
        <Column>
          <Carbohydrate value={this.props.carbohydrate} readOnly />
        </Column>
        <Column>
          <Protein value={this.props.protein} readOnly />
        </Column>
        <Column>
          <Ethanol value={this.props.ethanol} readOnly />
        </Column>
      </Row>
    );
  }
}

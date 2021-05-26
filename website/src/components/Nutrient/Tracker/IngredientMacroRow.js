import React from 'react';
import { Row, Column } from '../../../style/table';
import {
  Weight,
  Text,
  Fat,
  Carbohydrate,
  Protein,
  Ethanol,
} from '../../../style/inputs';

export default class IngredientMacroRow extends React.Component {
  constructor() {
    super();
    this.state = {
      weight: 0,
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.updateState();
  }

  componentDidMount() {
    this.updateState();
  }

  updateState = () =>
    this.setState({
      weight: this.props.weight,
      fat: this.props.fat,
      carbohydrate: this.props.carbohydrate,
      protein: this.props.protein,
      ethanol: this.props.ethanol,
    });

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value });
    this.props.onChange(this.state);
  };

  render() {
    if (this.props.isTitle)
      return (
        <Row columns={7} isTitle className={this.props.className}>
          <Column span={2} />
          <Column>Weight</Column>
          <Column>Fat</Column>
          <Column>Carbs</Column>
          <Column>Protein</Column>
          <Column>Ethanol</Column>
        </Row>
      );
    return (
      <Row columns={7} className={this.props.className}>
        <Column span={2}>
          <Text value={this.props.name} readOnly />
        </Column>
        <Weight
          name="weight"
          value={this.state.weight}
          onChange={this.onChange}
          readOnly={this.props.isBaseline}
        />
        <Fat
          name="fat"
          value={this.state.fat}
          onChange={this.onChange}
          readOnly={!this.props.isBaseline || this.props.macroReadOnly}
        />
        <Carbohydrate
          name="carbohydrate"
          value={this.state.carbohydrate}
          onChange={this.onChange}
          readOnly={!this.props.isBaseline || this.props.macroReadOnly}
        />
        <Protein
          name="protein"
          value={this.state.protein}
          onChange={this.onChange}
          readOnly={!this.props.isBaseline || this.props.macroReadOnly}
        />
        <Ethanol
          name="ethanol"
          value={this.state.ethanol}
          onChange={this.onChange}
          readOnly={!this.props.isBaseline || this.props.macroReadOnly}
        />
      </Row>
    );
  }
}

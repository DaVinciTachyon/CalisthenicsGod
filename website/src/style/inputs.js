import React from 'react';
import styled, { css } from 'styled-components';
import { Nutrients, Background } from './constants';
import ReactSelect from 'react-select';

const BaseStyle = css`
  border-radius: 5px;
  border-style: solid;
  border-width: ${(props) => (props.readOnly ? `0` : `2px`)};
  border-color: black;
  background-color: ${(props) =>
    props.readOnly ? `inherit` : Background.primary};
  text-align: center;
  margin: auto;
  padding: 0.2rem;
`;

const Input = styled.input`
  ${BaseStyle}
`;

const Text = styled(Input).attrs({
  type: 'text',
})``;

const Password = styled(Input).attrs({
  type: 'password',
})``;

const Date = styled(Input).attrs({
  type: 'date',
})``;

const Radio = styled(Input).attrs({
  type: 'radio',
})``;

const Number = styled(Input).attrs({
  type: 'number',
})`
  max-width: 4rem;
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Weight = styled(Number).attrs({
  min: 0,
  step: 0.1,
})``;

const Calories = styled(Number).attrs({
  min: 0,
  step: 1,
})``;

const Fat = styled(Weight)`
  background-color: ${Nutrients.fat.light};
  border-color: ${Nutrients.fat.dark};
`;

const Carbohydrate = styled(Weight)`
  background-color: ${Nutrients.carbohydrate.light};
  border-color: ${Nutrients.carbohydrate.dark};
`;

const Protein = styled(Weight)`
  background-color: ${Nutrients.protein.light};
  border-color: ${Nutrients.protein.dark};
`;

const Ethanol = styled(Weight)`
  background-color: ${Nutrients.ethanol.light};
  border-color: ${Nutrients.ethanol.dark};
`;

const BaseSelect = styled.select`
  ${BaseStyle}
`;

class Select extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({ value: this.props.defaultValue || this.state.value });
  }

  onChange = (evt) => {
    let value = this.state.value;
    if (this.props.isMulti) {
      value = [];
      evt.forEach((entry) => value.push(entry.value));
    } else if (evt.target.validity.valid) value = evt.target.value;
    this.setState({ value });
    this.props.onChange({ name: this.props.name, value });
  };

  render() {
    if (this.props.isMulti)
      //FIXME
      return (
        <ReactSelect
          name={this.props.name}
          id={this.props.id}
          onChange={this.onChange}
          options={this.props.options}
          isMulti
        />
      );
    const options = [];
    this.props.options.forEach((option) =>
      options.push(
        <option
          key={option.value}
          value={option.value}
          selected={option.value === this.state.value}
        >
          {option.label}
        </option>
      )
    );
    return (
      <BaseSelect
        name={this.props.name}
        id={this.props.id}
        onChange={this.onChange}
      >
        {options}
      </BaseSelect>
    );
  }
}

export {
  Text,
  Password,
  Radio,
  Date,
  Number,
  Calories,
  Weight,
  Fat,
  Carbohydrate,
  Protein,
  Ethanol,
  Select,
};

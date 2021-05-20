import React from 'react';
import styled from 'styled-components';
import { Nutrients } from './constants';

const Input = styled(
  ({ className, name, placeholder, label, unit, ...rest }) => (
    <label className={className}>
      <input name={name || 'input'} placeholder=" " {...rest} />
      {label && <span className="label">{label}</span>}
      {unit && (
        <span className="unit">
          <span>{unit}</span>
        </span>
      )}
    </label>
  )
)`
  position: relative;
  margin: 5px 0 0;
  border: 1px solid currentColor;
  border-radius: 4px;
  display: flex;

  & span.unit {
    font-size: 1.2em;
    color: gray;
    padding-right: 8px;
    display: flex;
    align-items: center;
    background: transparent;
  }

  & span.label {
    position: absolute;
    left: 0;
    top: 0;
    padding: calc(0.5rem * 0.75) calc(0.5rem * 0.5);
    margin: calc(0.5rem * 0.75 + 3px) calc(0.5rem * 0.5);
    white-space: nowrap;
    transform: translate(0, 0);
    transform-origin: 0 0;
    transition: transform 120ms ease-in;
    font-weight: bold;
    line-height: 1.2;
    border-radius: 10px;
  }

  & input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    outline: 0;
    padding: calc(0.5rem * 1.5) 0.5rem;
    color: currentColor;
    background: transparent;

    &:focus,
    &:not(:placeholder-shown) {
      & + span.label {
        transform: translate(0.25rem, -65%) scale(0.8);
        background: white;
      }
    }
  }
`;

const Text = styled(Input).attrs({
  type: 'text',
})``;

const Password = styled(Text).attrs({
  type: 'password',
})``;

const Date = styled(Input).attrs({
  type: 'text',
  onFocus: (e) => (e.target.type = 'date'),
  onBlur: (e) => (e.target.value === '' ? (e.target.type = 'text') : undefined),
})`
  & input {
    text-align: center;
    &:not(.has-value):before {
      color: lightgray;
      content: attr(placeholder);
    }
  }
`;

const Number = styled(Input).attrs({
  type: 'number',
})`
  & input {
    -moz-appearance: textfield;
    text-align: center;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
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

const RadioOption = styled(({ className, label, value, ...rest }) => (
  <div className={className}>
    <input id={value} value={value} {...rest} />
    <label for={value}>{label}</label>
  </div>
)).attrs({
  type: 'radio',
})`
  display: ${(props) => (props.isHorizontal ? `inline-block` : `block`)};
  margin: 3px;
  cursor: pointer;

  & label {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid currentColor;
    transition: all 0.3s ease-out;
  }

  & input {
    display: none;
  }

  & input:checked + label {
    background-color: black;
    color: white;
  }
`;

const Radio = styled(
  ({ className, options, name, value, onChange, ...rest }) => (
    <div className={className}>
      {options?.map((option) => (
        <RadioOption
          name={name}
          value={option.value}
          checked={option.value === value}
          onClick={onChange}
          label={option.label}
          {...rest}
        />
      ))}
    </div>
  )
)`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  margin: auto;
`;

const BaseSelect = styled.select`
  ${(props) =>
    props.disabled
      ? `& option:not(:checked) {
    display: none;
  }`
      : ``}
`;

class Select extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.set();
  }

  set = () =>
    this.setState({ value: this.props.defaultValue || this.state.value });

  onChange = async (evt) => {
    if (this.props.readOnly) return;
    let value = this.state.value;
    if (this.props.isMulti)
      value = Array.from(evt.target.selectedOptions, (option) => option.value);
    else if (evt.target.validity.valid) value = evt.target.value;
    await this.setState({ value });
    this.props.onChange({ name: this.props.name, value });
  };

  render() {
    return (
      <BaseSelect
        name={this.props.name}
        id={this.props.id}
        onChange={this.onChange}
        disabled={this.props.readOnly}
        multiple={this.props.isMulti}
        size={this.props.isMulti ? 3 : undefined}
      >
        {this.props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={
              this.props.isMulti
                ? this.state.value.includes(option.value)
                : option.value === this.state.value
            }
          >
            {option.label}
          </option>
        ))}
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

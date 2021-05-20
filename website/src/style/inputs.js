import React from 'react';
import styled, { css } from 'styled-components';
import { Nutrients, Background } from './constants';

const BaseStyle = css`
  border-radius: 5px;
  border-style: solid;
  border-width: ${(props) => (props.readOnly ? `0` : `2px`)};
  border-color: black;
  background-color: ${(props) =>
    props.readOnly ? `inherit` : Background.primary};
  text-align: center;
  width: 100%;
  margin: auto;
  padding: 0.2rem;
  outline: 0;
`;

const Input = styled.input`
  ${BaseStyle}
`;

const Text = styled(({ className, name, label, ...rest }) => {
  const rName = name || 'input';
  return (
    <div className={className}>
      <input name={rName} placeholder={rName} {...rest} />
      <label for={rName}>{label}</label>
    </div>
  );
}).attrs({
  type: 'text',
})`
  position: relative;
  padding: 15px 0 0;
  margin: auto;
  width: 50%;

  & input {
    width: 100%;
    border: 0;
    ${(props) => (!props.readOnly ? `border-bottom: 2px solid lightblue;` : ``)}
    outline: 0;
    padding: 7px 3px;
    background: transparent;
    transition: border-color 0.2s;
    margin-top: 6px;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ label {
      cursor: text;
      top: 20px;
    }
  }

  & label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1.2rem;
    font-weight: 600;
    color: #9b9b9b;
  }

  ${(props) =>
    !props.readOnly
      ? `
  & input:focus {
    ~ label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      color: #11998e;
    }

    padding-bottom: 6px;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
  }

  & input {
    &:required,
    &:invalid {
      box-shadow: none;
    }
  }`
      : ``}
`;

const Password = styled(Text).attrs({
  type: 'password',
})``;

const Date = styled(Input).attrs({
  type: 'date',
})``;

const Radio = styled(Input).attrs({
  type: 'radio',
})``;

const BaseNumber = styled.input.attrs({
  type: 'number',
})`
  -moz-appearance: textfield;
  border: none;
  text-align: center;
  max-width: 4rem;

  &:focus {
    border: none;
  }

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Number = styled(({ className, children, type, unit, style, ...rest }) => {
  if (unit)
    return (
      <div style={style} className={`${className} container`}>
        <BaseNumber className="input" type={type} {...rest}>
          {children}
        </BaseNumber>
        <div className="unit">{unit}</div>
      </div>
    );
  return (
    <BaseNumber style={style} className={className} type={type} {...rest}>
      {children}
    </BaseNumber>
  );
})`
  ${BaseStyle}

  &.container {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  & .unit {
    margin: 0 0.5rem 0;
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

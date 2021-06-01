import React from 'react';
import styled from 'styled-components';
import { Nutrients } from './constants';

const Input = styled(
  ({ className, name, placeholder, label, unit, ...rest }) => (
    <label className={className}>
      <input name={name || 'input'} placeholder="&#8203;" {...rest} />
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
  margin: ${({ label }) => (label ? '10px' : '2px')};
  border: ${({ label, readOnly }) =>
    label || !readOnly ? '1px solid currentColor' : 'none'};
  border-radius: 4px;
  display: flex;
  height: fit-content;
  background-color: ${({ primaryColor }) => primaryColor || 'transparent'};
  border-color: ${({ secondaryColor }) => secondaryColor || 'currentColor'};

  ${({ readOnly }) =>
    readOnly
      ? ``
      : `  &:focus-within {
    border-width: 2px;
  }`}

  & span.unit {
    font-size: 0.8em;
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
    width: 100%;
    padding: calc(0.5rem * 1.5) 0.5rem;
    color: currentColor;
    background: transparent;

    ${({ readOnly }) => (readOnly ? '' : '&:focus,')}
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
  }
`;

const Number = styled(Input).attrs(({ value, decimalPlaces }) => ({
  value:
    Math.round(value * Math.pow(10, decimalPlaces || 1)) /
    Math.pow(10, decimalPlaces || 1),
  type: 'number',
}))`
  & input {
    -moz-appearance: textfield;
    text-align: center;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const Weight = styled(Number).attrs(({ unit, step }) => ({
  unit: unit || 'g',
  min: 0,
  step: step || 0.1,
}))``;

const Length = styled(Number).attrs({
  min: 0,
  step: 0.1,
})``;

const Calories = styled(Number).attrs({
  min: 0,
  step: 1,
  unit: 'kcal',
})``;

const Fat = styled(Weight).attrs({
  primaryColor: Nutrients.fat.light,
  secondaryColor: Nutrients.fat.dark,
})``;

const Carbohydrate = styled(Weight).attrs({
  primaryColor: Nutrients.carbohydrate.light,
  secondaryColor: Nutrients.carbohydrate.dark,
})``;

const Protein = styled(Weight).attrs({
  primaryColor: Nutrients.protein.light,
  secondaryColor: Nutrients.protein.dark,
})``;

const Ethanol = styled(Weight).attrs({
  primaryColor: Nutrients.ethanol.light,
  secondaryColor: Nutrients.ethanol.dark,
})``;

const RadioOption = styled(({ className, label, value, ...rest }) => (
  <div className={className}>
    <input id={value} value={value} {...rest} />
    <label for={value}>{label}</label>
  </div>
)).attrs({
  type: 'radio',
})`
  display: ${({ isHorizontal }) => (isHorizontal ? `inline-block` : `block`)};
  margin: 3px;
  cursor: pointer;
  height: fit-content;

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

const SelectedOption = styled(({ className, label, ...rest }) => (
  <div className={className} {...rest}>
    <span>{label}</span>
    <span className="cross">✕</span>
  </div>
))`
  background: lightgrey;
  display: inline-block;
  border-radius: 4px;
  font-size: 0.7rem;
  margin: 2px;
  padding: 2px;

  & span {
    padding: 3px;
  }

  ${({ readOnly }) =>
    !readOnly
      ? `
  &:hover {
    background: crimson;
  }
  `
      : `
  & span.cross {
    display: none;
  }
  `}
`;

const DropdownOption = styled(({ className, label, ...rest }) => (
  <div className={className} {...rest}>
    {label}
  </div>
))`
  width: 100%;
  font-size: 0.7rem;
  padding: 2px;

  &:hover {
    background: lightgreen;
  }
`;

const SelectDropdown = styled(
  ({ className, options, value, onSelect, isMulti, ...rest }) => (
    <div className={className} {...rest}>
      {options.map((option) =>
        (isMulti ? value?.find((id) => option.value === id) : false) ? (
          <></>
        ) : (
          <DropdownOption
            label={option.label}
            value={option.value}
            onClick={() => onSelect(option)}
          />
        )
      )}
    </div>
  )
)`
  display: none;
  position: absolute;
  background: white;
  border: 1px solid currentColor;
  width: 100%;
  z-index: 1;
`;

const EmptySpan = <span className="empty">&#8203;</span>;

const SelectChoices = styled(
  ({ className, options, value, onSelect, readOnly, isMulti, ...rest }) => (
    <div className={className} {...rest}>
      <div>
        {isMulti
          ? (() => {
              const optionDivs = value?.map((id) => {
                const option = options.find((option) => option.value === id);
                return option ? (
                  <SelectedOption
                    label={option.label}
                    value={option.value}
                    onClick={() => onSelect(option)}
                    readOnly={readOnly}
                  />
                ) : (
                  <></>
                );
              });
              return optionDivs.length > 0 ? optionDivs : EmptySpan;
            })()
          : (() => {
              const option = options.find((option) => option.value === value);
              return option ? <span>{option.label}</span> : EmptySpan;
            })()}
      </div>
      <span className="arrow">🢓</span>
    </div>
  )
)`
  position: relative;
  overflow: hidden;
  display: flex;

  &:hover {
    & span.arrow {
      background: lightgrey;
    }
  }

  &:active {
    & span.arrow {
      color: black;
    }
  }

  & span.arrow {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    color: darkgrey;
    justify-content: center;
    align-items: center;
    display: ${({ readOnly }) => (readOnly ? `none` : `flex`)};
  }
`;

class BaseSelect extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.set();
  }

  set = () =>
    this.setState({
      value: this.props.value || (this.props.isMulti ? [] : ''),
    });

  onChange = (evt, isAdding = true) => {
    const { readOnly, isMulti, name, onChange } = this.props;
    if (readOnly) return;
    let value = this.props.value;
    if (isMulti && isAdding) value = value.concat(evt.value);
    else if (isMulti) value = value.filter((id) => id !== evt.value);
    else value = evt.value;
    onChange({ name, value });
  };

  render() {
    const { isMulti, readOnly, className, options, value, label } = this.props;
    return (
      <div className={className}>
        <SelectChoices
          options={options}
          value={value}
          onSelect={(option) => this.onChange(option, false)}
          readOnly={readOnly}
          isMulti={isMulti}
          label={label}
        />
        {!readOnly && (
          <SelectDropdown
            options={options}
            value={value}
            onSelect={(option) => this.onChange(option, true)}
            isMulti={isMulti}
          />
        )}
        {label && (
          <span
            className="label"
            style={(() =>
              (isMulti && value.length > 0) || (!isMulti && value !== undefined)
                ? {
                    transform: 'translate(0.25rem, -65%) scale(0.8)',
                    background: 'white',
                  }
                : {})()}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
}

const Select = styled(BaseSelect)`
  position: relative;
  margin: 10px;

  & ${SelectChoices} {
    border: 1px solid currentColor;
    border-radius: 4px;
    box-sizing: border-box;
    padding: calc(0.5rem * 1.5) 0.5rem;
    width: 100%;
  }

  & ${SelectChoices}:hover + ${SelectDropdown}, & ${SelectDropdown}:hover {
    display: block;
  }

  & span.label {
    position: absolute;
    left: 0;
    top: 0;
    padding: calc(0.5rem * 0.75) calc(0.5rem * 0.5);
    margin: calc(0.5rem * 0.75 + 3px) calc(0.5rem * 0.5);
    white-space: nowrap;
    transform-origin: 0 0;
    transition: transform 120ms ease-in;
    font-weight: bold;
    line-height: 1.2;
    border-radius: 10px;
    transform: translate(0, 0);
  }

  ${({ readOnly }) =>
    readOnly
      ? `& option:not(:checked) {
    display: none;
  }`
      : ``}
`;

const Range = styled(
  ({
    className,
    value,
    step,
    min,
    max,
    label,
    unit,
    isPercentage,
    ...rest
  }) => (
    <div className={className}>
      <span className="label">{label}</span>
      <span className="value">{`${(() => {
        let decimalPlaces = 0;
        let nStep = step;
        while (nStep % 1 !== 0) {
          nStep *= 10;
          decimalPlaces++;
        }
        return (
          Math.round(
            value * Math.pow(10, decimalPlaces + (isPercentage ? 2 : 0))
          ) / Math.pow(10, decimalPlaces)
        );
      })()} ${unit}`}</span>
      <input
        type="range"
        step={step || 1}
        min={min || 0}
        max={max || 10}
        value={value}
        {...rest}
      />
    </div>
  )
)`
  width: 100%;
  padding: 3px 10px;
  text-align: center;
  position: relative;

  & span.label {
    position: absolute;
    left: 0;
    top: 0;
    padding: 2px 0.5em;
    white-space: nowrap;
    font-size: 0.8em;
    font-weight: bold;
    border-radius: 10px;
  }

  & span.value {
    font-size: 0.8rem;
  }

  & input {
    border: 1px solid currentColor;
    border-radius: 4px;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 1.5em;
    overflow: hidden;

    &::before,
    &::after {
      padding: 5px;
    }

    &::before {
      content: '${({ isPercentage, min, unit }) =>
        `${(isPercentage ? 100 : 1) * min} ${unit}`}';
      left: 0;
      border-right: 1px solid currentColor;
    }

    &::after {
      content: '${({ isPercentage, max, unit }) =>
        `${(isPercentage ? 100 : 1) * max} ${unit}`}';
      right: 0;
      border-left: 1px solid currentColor;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      border: 1px solid currentColor;
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      background: lightgray;
      cursor: pointer;
    }

    &::-webkit-slider-thumb {
      border: 1px solid currentColor;
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      background: lightgray;
      cursor: pointer;
    }

    ${({ readOnly }) =>
      readOnly
        ? ``
        : `&:focus {
      border-width: 2px;
    }`}
  }
`;

export {
  Text,
  Password,
  Radio,
  Date,
  Number,
  Calories,
  Weight,
  Length,
  Fat,
  Carbohydrate,
  Protein,
  Ethanol,
  Select,
  Range,
};

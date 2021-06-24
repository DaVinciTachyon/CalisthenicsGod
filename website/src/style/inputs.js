import React from 'react'
import styled from 'styled-components'
import { Nutrients } from './constants'
import {
  Chip,
  Select as MaterialSelect,
  FormControl,
  MenuItem,
  InputLabel,
  Input as MaterialInput,
} from '@material-ui/core'

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
  ),
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
`

const Text = styled(Input).attrs({
  type: 'text',
})``

const Password = styled(Text).attrs({
  type: 'password',
})``

const Date = styled(Input).attrs({
  type: 'text',
  onFocus: (e) => (e.target.type = 'date'),
  onBlur: (e) => (e.target.value === '' ? (e.target.type = 'text') : undefined),
})`
  & input {
    text-align: center;
  }
`

const Number = styled(Input).attrs(({ value, decimalPlaces }) => ({
  value:
    Math.round(parseFloat(value) * Math.pow(10, decimalPlaces || 1)) /
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
`

const Weight = styled(Number).attrs(({ unit, step }) => ({
  unit: unit || 'g',
  min: 0,
  step: step || 0.1,
}))``

const Length = styled(Number).attrs({
  min: 0,
  step: 0.1,
})``

const Calories = styled(Number).attrs({
  min: 0,
  step: 1,
  unit: 'kcal',
})``

const Fat = styled(Weight).attrs({
  primaryColor: Nutrients.fat.light,
  secondaryColor: Nutrients.fat.dark,
})``

const Carbohydrate = styled(Weight).attrs({
  primaryColor: Nutrients.carbohydrate.light,
  secondaryColor: Nutrients.carbohydrate.dark,
})``

const Protein = styled(Weight).attrs({
  primaryColor: Nutrients.protein.light,
  secondaryColor: Nutrients.protein.dark,
})``

const Ethanol = styled(Weight).attrs({
  primaryColor: Nutrients.ethanol.light,
  secondaryColor: Nutrients.ethanol.dark,
})``

const RadioOption = styled(({ className, label, value, name, ...rest }) => (
  <div className={className}>
    <input id={value} value={value} name={name || 'input'} {...rest} />
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
`

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
  ),
)`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  margin: auto;
`

class Select extends React.Component {
  onChange = (evt) => {
    if (this.props.readOnly) return
    this.props.onChange({ name: this.props.name, value: evt.target.value })
  }

  render() {
    const { isMulti, readOnly, options, value, label, name } = this.props
    return (
      <FormControl>
        <InputLabel id="select">{label}</InputLabel>
        <MaterialSelect
          labelId="select"
          name={name}
          multiple={isMulti}
          value={value}
          onChange={this.onChange}
          input={<MaterialInput />}
          renderValue={(selected) => (
            <div>
              {isMulti &&
                selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      options.find((option) => option.value === value)?.label ||
                      value
                    }
                  />
                ))}
              {!isMulti && <>{selected}</>}
            </div>
          )}
          disabled={readOnly}
        >
          {options.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </MaterialSelect>
      </FormControl>
    )
  }
}

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
    name,
    ...rest
  }) => (
    <div className={className}>
      <span className="label">{label}</span>
      <span className="value">{`${(() => {
        let decimalPlaces = 0
        let nStep = step
        while (nStep % 1 !== 0) {
          nStep *= 10
          decimalPlaces++
        }
        return (
          Math.round(
            value * Math.pow(10, decimalPlaces + (isPercentage ? 2 : 0)),
          ) / Math.pow(10, decimalPlaces)
        )
      })()} ${unit}`}</span>
      <input
        type="range"
        step={step || 1}
        min={min || 0}
        max={max || 10}
        value={value}
        name={name || 'range'}
        {...rest}
      />
    </div>
  ),
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
`

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
}

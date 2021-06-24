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
  Slider,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

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

const Select = ({
  isMulti,
  readOnly,
  options,
  value,
  label,
  name,
  ...rest
}) => (
  <FormControl>
    <InputLabel id="select">{label}</InputLabel>
    <MaterialSelect
      labelId="select"
      name={name}
      multiple={isMulti}
      value={value}
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
      {...rest}
    >
      {options.map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </MaterialSelect>
  </FormControl>
)

const Range = withStyles(() => ({
  root: {
    width: '95%',
    display: 'block',
    'margin-left': 'auto',
    'margin-right': 'auto',
  },
}))(
  ({ min, max, unit, value, isPercentage, name, onChange, label, ...rest }) => {
    const getValue = (val) => val * (isPercentage ? 100 : 1)
    const getString = (val) => `${getValue(val)}${unit}`
    const minimum = min || 0
    const maximum = max || 10
    return (
      <div>
        <InputLabel id="range">{label}</InputLabel>
        <Slider
          labelId="range"
          onChange={(evt, val) => {
            evt.target.name = name
            evt.target.value = val
            onChange(evt)
          }}
          value={value || minimum}
          min={minimum}
          max={maximum}
          valueLabelDisplay="on"
          valueLabelFormat={getValue}
          marks={[
            {
              value: minimum,
              label: getString(minimum),
            },
            {
              value: maximum,
              label: getString(maximum),
            },
          ]}
          {...rest}
        />
      </div>
    )
  },
)

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

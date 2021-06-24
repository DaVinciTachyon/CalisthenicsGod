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
  TextField,
  InputAdornment,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const defaultRoot = {
  display: 'block',
  margin: '5px',
  width: '95%',
}

const Input = styled(
  withStyles(() => ({
    root: { ...defaultRoot },
  }))(
    ({
      type,
      step = 0.1,
      unit,
      primaryColor,
      secondaryColor,
      value,
      ...rest
    }) => (
      <TextField
        value={
          type === 'number'
            ? parseFloat(value) - (parseFloat(value) % step)
            : value
        }
        type={type}
        step={step}
        variant="outlined"
        fullWidth={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{unit || ''}</InputAdornment>
          ),
          style: {
            backgroundColor: primaryColor,
            borderColor: secondaryColor,
          },
        }}
        {...rest}
      />
    ),
  ),
)``

const Text = styled(Input).attrs({
  type: 'text',
})``

const Password = styled(Text).attrs({
  type: 'password',
})``

const Date = styled(Input).attrs({
  type: 'date',
})`
  & input {
    text-align: center;
  }
`

const Number = styled(Input).attrs(() => ({
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

const Select = withStyles(() => ({
  root: {
    ...defaultRoot,
  },
}))(({ multiple, options, value, label, name, ...rest }) => (
  <FormControl>
    <InputLabel id="select">{label}</InputLabel>
    <MaterialSelect
      labelId="select"
      name={name}
      multiple={multiple}
      value={value}
      input={<MaterialInput />}
      renderValue={(selected) => {
        if (multiple)
          return selected.map((value) => (
            <Chip
              key={value}
              label={
                options.find((option) => option.value === value)?.label || value
              }
            />
          ))
        return (
          options.find((option) => option.value === selected)?.label || selected
        )
      }}
      {...rest}
    >
      {options.map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </MaterialSelect>
  </FormControl>
))

const Range = withStyles(() => ({
  root: {
    ...defaultRoot,
    margin: '20px auto 20px auto',
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

import React from 'react'
import styled from 'styled-components'
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
import { Autocomplete } from '@material-ui/lab'
import { withStyles, useTheme } from '@material-ui/core/styles'

const defaultRoot = {
  display: 'block',
  margin: '5px',
  width: '95%',
}

const Input = withStyles(() => ({
  root: { ...defaultRoot },
}))(({ type, step = 0.1, unit, value, style = {}, ...rest }) => (
  <TextField
    value={
      type === 'number'
        ? (() => {
            //FIXME
            let it = step
            let num = 0
            if (it < 1) {
              while (it < 1) {
                num++
                it *= 10
              }
            } else {
              while (it > 1) {
                num--
                it /= 10
              }
            }
            return (
              Math.round(parseFloat(value) * Math.pow(10, num)) /
              Math.pow(10, num)
            )
          })()
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
      style,
    }}
    {...rest}
  />
))

const Text = ({ ...rest }) => <Input type="text" {...rest} />
const Password = ({ ...rest }) => <Input type="password" {...rest} />

const Date = withStyles(() => ({
  root: {
    '& input': {
      'text-align': 'center',
    },
  },
}))(({ ...rest }) => <Input type="date" {...rest} />)

const Number = withStyles(() => ({
  root: {
    '& input': {
      '-moz-appearance': 'textfield',
      'text-align': 'center',
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
    },
  },
}))(({ ...rest }) => <Input type="number" {...rest} />)

const Weight = ({ unit, step, ...rest }) => (
  <Number unit={unit || 'g'} min={0} step={step || 0.1} {...rest} />
)
const Length = ({ ...rest }) => <Number min={0} step={0.1} {...rest} />
const Calories = ({ ...rest }) => (
  <Number unit={'kcal'} min={0} step={1} {...rest} />
)

const Macro = (name, { style, ...rest }) => {
  const { palette } = useTheme()
  return (
    <Weight
      style={{
        ...style,
        backgroundColor: palette[name].light,
        borderColor: palette[name].dark,
      }}
      {...rest}
    />
  )
}

const Fat = (props) => Macro('fat', props)
const Carbohydrate = (props) => Macro('carbohydrate', props)
const Protein = (props) => Macro('protein', props)
const Ethanol = (props) => Macro('ethanol', props)

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
}))(({ multiple, options, value, label, name, searchable, ...rest }) => (
  <FormControl>
    {!searchable && (
      <>
        <InputLabel id="select">{label}</InputLabel>
        <MaterialSelect
          labelId="select"
          name={name}
          multiple={multiple}
          value={value || 'default'}
          input={<MaterialInput />}
          renderValue={(selected) => {
            if (multiple)
              return selected.map((value) => (
                <Chip
                  key={value}
                  label={
                    options.find((option) => option.value === value)?.label ||
                    value
                  }
                />
              ))
            return (
              options.find(
                (option) =>
                  (!option.value && !selected) || option.value === selected,
              )?.label || selected
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
      </>
    )}
    {searchable && (
      <Autocomplete
        labelId="select"
        name={name}
        multiple={multiple}
        options={options}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    )}
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

import React from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { Calories, Weight } from '../../style/inputs'
import IngredientSelect from './IngredientSelect'
import { useSelector } from 'react-redux'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import { useTheme } from '@material-ui/core/styles'

const CalorieTypeProvider = (props) => (
  <DataTypeProvider
    formatterComponent={({ value }) => <span>{value} kcal</span>}
    editorComponent={(props) => <Calories {...props} />}
    {...props}
  />
)

const WeightTypeProvider = ({ Component, ...rest }) => (
  <DataTypeProvider
    formatterComponent={({ value }) => <span>{value} g</span>}
    editorComponent={({ onValueChange, ...props }) =>
      Component ? (
        <Component
          onChange={(evt) => onValueChange(evt.target.value)}
          {...props}
        />
      ) : (
        <Weight
          onChange={(evt) => onValueChange(evt.target.value)}
          {...props}
        />
      )
    }
    {...rest}
  />
)

const IngredientTypeProvider = (props) => {
  const ingredients = useSelector((state) => state.ingredients)
  return (
    <DataTypeProvider
      formatterComponent={({ value }) => (
        <span>
          {ingredients.find((ingredient) => ingredient._id === value).name}
        </span>
      )}
      editorComponent={({ onValueChange, ...rest }) => (
        <IngredientSelect
          onChange={(evt) => onValueChange(evt._id)}
          {...rest}
        />
      )}
      {...props}
    />
  )
}

const CellComponent = ({ style, ...props }) => {
  const { palette } = useTheme()
  const macroCell = (name) => (
    <Table.Cell
      style={{
        backgroundColor: palette[name].light,
        ...style,
      }}
      {...props}
    />
  )
  const { column } = props
  if (column.name === 'fat') return macroCell('fat')
  else if (column.name === 'carbohydrate') return macroCell('carbohydrate')
  else if (column.name === 'protein') return macroCell('protein')
  else if (column.name === 'ethanol') return macroCell('ethanol')
  return <Table.Cell style={style} {...props} />
}

export {
  CalorieTypeProvider,
  WeightTypeProvider,
  IngredientTypeProvider,
  CellComponent,
}

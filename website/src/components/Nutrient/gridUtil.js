import React from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { Calories, Weight } from '../../style/inputs'
import IngredientSelect from './IngredientSelect'
import { useSelector } from 'react-redux'
import { Table, TableEditColumn } from '@devexpress/dx-react-grid-material-ui'
import { useTheme } from '@material-ui/core/styles'

const CalorieTypeProvider = (props) => (
  <DataTypeProvider
    formatterComponent={({ value }) => <span>{Math.round(value)} kcal</span>}
    editorComponent={(props) => <Calories {...props} />}
    {...props}
  />
)

const WeightTypeProvider = ({ Component, ...rest }) => (
  <DataTypeProvider
    formatterComponent={({ value }) => (
      <span>{Math.round(value * 10) / 10} g</span>
    )}
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
          onChange={(evt) => onValueChange(evt?._id)}
          {...rest}
        />
      )}
      {...props}
    />
  )
}

const CellComponent = ({ style, ...props }) => {
  const { palette } = useTheme()
  const { column } = props
  if (
    [
      'fat',
      'carbohydrate',
      'protein',
      'ethanol',
      'weight',
      'calories',
    ].includes(column.name)
  )
    return (
      <Table.Cell
        style={{
          backgroundColor:
            palette[column.name]?.light || style?.backgroundColor,
          textAlign: 'center',
          ...style,
        }}
        {...props}
      />
    )
  return <Table.Cell style={style} {...props} />
}

const validate = (rows, columns) =>
  Object.entries(rows).reduce(
    (acc, [rowId, row]) => ({
      ...acc,
      [rowId]: columns.some((column) => column.required && !row[column.name]),
    }),
    {},
  )

const EditCell = ({ errors, ...props }) => {
  const { children } = props
  return (
    <TableEditColumn.Cell {...props}>
      {React.Children.map(children, (child) =>
        child?.props.id === 'commit'
          ? React.cloneElement(child, {
              disabled: errors[props.tableRow.rowId],
            })
          : child,
      )}
    </TableEditColumn.Cell>
  )
}

export {
  CalorieTypeProvider,
  WeightTypeProvider,
  IngredientTypeProvider,
  CellComponent,
  validate,
  EditCell,
}

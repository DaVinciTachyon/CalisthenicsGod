import React from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { Calories, Weight, Select, Number } from '../style/inputs'
import IngredientSelect from './Nutrient/IngredientSelect'
import ExerciseSelect from './Workouts/ExerciseSelect'
import { useSelector } from 'react-redux'
import { Table, TableEditColumn } from '@devexpress/dx-react-grid-material-ui'
import { useTheme } from '@material-ui/core/styles'
import SetEditor from './Workouts/Tracker/SetEditor'
import { Column } from '../style/table'
import { ButtonGroup } from '@material-ui/core'
import { Button, DeleteButton } from '../style/buttons'

const SetsTypeProvider = (props) => {
  const exercises = useSelector((state) => state.exercises)
  return (
    <DataTypeProvider
      formatterComponent={({ value }) => (
        <div>
          {value.map((set, index) => (
            <Set key={set._id || index} set={set} />
          ))}
        </div>
      )}
      editorComponent={({ onValueChange, ...editProps }) => {
        const exercise = exercises.find(
          (exercise) => exercise._id === editProps.row.id,
        )
        return (
          <Column>
            {editProps.value?.map((set, i) => (
              <SetEditor
                key={i}
                value={set}
                type={exercise?.motionType.motion}
                variation={editProps.row.variation}
                isWeighted={editProps.row.weight}
                onChange={(set) => {
                  const newValue = JSON.parse(JSON.stringify(editProps.value))
                  newValue.splice(i, 1, set)
                  onValueChange(newValue)
                }}
              />
            ))}
            <ButtonGroup orientation="horizontal">
              <Button
                onClick={() => {
                  if (editProps.value) {
                    const newValue = JSON.parse(JSON.stringify(editProps.value))
                    newValue.push(
                      newValue.length > 0 ? newValue[newValue.length - 1] : {},
                    )
                    onValueChange(newValue)
                  } else onValueChange([{}])
                }}
              >
                +
              </Button>
              <DeleteButton
                onClick={() => {
                  if (editProps.value) {
                    const newValue = JSON.parse(JSON.stringify(editProps.value))
                    newValue.pop()
                    onValueChange(newValue)
                  } else onValueChange([])
                }}
              >
                -
              </DeleteButton>
            </ButtonGroup>
          </Column>
        )
      }}
      {...props}
    />
  )
}

const Set = ({ set: { repetitions, distance, time, weight } }) => (
  <div>
    {repetitions && <span>{repetitions} r</span>}
    {distance && <span>{distance} m</span>}
    {time && (
      <span>
        {distance ? ' in ' : repetitions ? ' * ' : undefined}
        {time} s
      </span>
    )}
    {weight && <span> * {weight} kg</span>}
  </div>
)

const WeightedTypeProvider = (props) => (
  <DataTypeProvider
    formatterComponent={({ row }) => (
      <span>
        {row.sets?.length > 0 && row.sets[0].weight
          ? row.sets[0].weight > 0
            ? 'Weighted'
            : 'Assisted'
          : 'Bodyweight'}
      </span>
    )}
    editorComponent={({ onValueChange, ...props }) => (
      <Select
        options={[
          { label: 'Bodyweight', value: 0 },
          { label: 'Weighted', value: 1 },
          { label: 'Assisted', value: -1 },
        ]}
        onChange={(evt) => onValueChange(evt.target.value)}
        {...props}
      />
    )}
    {...props}
  />
)

const VariationTypeProvider = (props) => {
  const exercises = useSelector((state) => state.exercises)
  return (
    <DataTypeProvider
      formatterComponent={({ row, value }) => {
        const exercise = exercises.find((exercise) => exercise._id === row.id)
        return (
          <span>
            {row.variation ||
              (exercise?.motionType.frontalPlane === 'rotational'
                ? 'Bidirectional'
                : exercise?.motionType.motion === 'isotonic'
                ? 'Isotonic'
                : 'Standard')}
          </span>
        )
      }}
      editorComponent={({ onValueChange, ...props }) => {
        const exercise = exercises.find(
          (exercise) => exercise._id === props.row.id,
        )
        let options = [{ value: 'default', label: 'Standard' }]
        if (exercise?.motionType.frontalPlane === 'rotational')
          return [
            { value: 'default', label: 'Bidirectional' },
            { value: 'clockwise', label: 'Clockwise' },
            { value: 'anti-clockwise', label: 'Anti-clockwise' },
          ]
        else if (exercise?.motionType.motion === 'isotonic')
          return [
            { value: 'default', label: 'Isotonic' },
            { value: 'eccentric', label: 'Eccentric' },
            { value: 'concentric', label: 'Concentric' },
          ]
        return (
          <Select
            options={options}
            onChange={(evt) => onValueChange(evt.target.value)}
            {...props}
          />
        )
      }}
      {...props}
    />
  )
}

const SagittalPlaneTypeProvider = (props) => {
  const exercises = useSelector((state) => state.exercises)
  return (
    <DataTypeProvider
      formatterComponent={({ row, value }) => (
        <span>{row.sagittalPlane || 'Bilateral'}</span>
      )}
      editorComponent={({ onValueChange, ...props }) => {
        const exercise = exercises.find(
          (exercise) => exercise._id === props.row.id,
        )
        let options = [{ value: 'default', label: 'Bilateral' }]
        if (exercise?.motionType.sagittalPlane === 'unilateral')
          options = [
            { value: 'right', label: 'Right' },
            { value: 'left', label: 'Left' },
          ]
        return (
          <Select
            options={options}
            onChange={(evt) => onValueChange(evt.target.value)}
            {...props}
          />
        )
      }}
      {...props}
    />
  )
}

const ExerciseTypeProvider = (props) => {
  const exercises = useSelector((state) => state.exercises)
  return (
    <DataTypeProvider
      formatterComponent={({ value }) => (
        <span>
          {exercises.find((exercise) => exercise._id === value)?.name || 'NaN'}
        </span>
      )}
      editorComponent={({ onValueChange, ...rest }) => (
        <ExerciseSelect
          onChange={(evt) => onValueChange(evt.target.value)}
          {...rest}
        />
      )}
      {...props}
    />
  )
}

const TimeTypeProvider = (props) => (
  <DataTypeProvider
    formatterComponent={({ value }) =>
      value && value !== 0 ? <span>{value} s</span> : <></>
    }
    editorComponent={({ onValueChange, ...rest }) => (
      <Number
        onChange={(evt) => onValueChange(evt.target.value)}
        unit="s"
        {...rest}
      />
    )}
    {...props}
  />
)

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
  SetsTypeProvider,
  WeightedTypeProvider,
  VariationTypeProvider,
  SagittalPlaneTypeProvider,
  ExerciseTypeProvider,
  TimeTypeProvider,
  CalorieTypeProvider,
  WeightTypeProvider,
  IngredientTypeProvider,
  CellComponent,
  validate,
  EditCell,
}

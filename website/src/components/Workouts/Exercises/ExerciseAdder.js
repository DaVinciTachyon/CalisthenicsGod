import React from 'react'
import { Row, Column } from '../../../style/table'
import { Button, ErrorButton } from '../../../style/buttons'
import { Text, Select, Radio } from '../../../style/inputs'
import StageSelect from '../StageSelect'
import ExerciseSelect from '../ExerciseSelect'
import { ButtonGroup, FormControl } from '@material-ui/core'

export default class Exercises extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      abbreviation: '',
      description: '',
      componentExercises: undefined,
      transversePlane: '',
      kineticChain: '',
      verticality: '',
      frontalPlane: '',
      motion: '',
      sagittalPlane: '',
      potentialStages: [],
      requirements: [],
      hasComponents: false,
    }
  }

  componentDidMount() {
    this.set()
  }

  set = () => {
    this.setState({
      name: '',
      abbreviation: '',
      description: '',
      hasComponents: false,
      potentialStages: [],
      requirements: [],
    })
    this.setMotionType()
  }

  setMotionType = () =>
    this.setState({
      componentExercises: undefined,
      transversePlane: 'upper',
      kineticChain: 'closed',
      verticality: 'horizontal',
      frontalPlane: 'push',
      sagittalPlane: 'bilateral',
      motion: 'isometric',
    })

  onChange = (evt) => {
    if (evt.target.name === 'hasComponents' && evt.target.value === true)
      this.setState({
        componentExercises: [],
        transversePlane: undefined,
        kineticChain: undefined,
        verticality: undefined,
        frontalPlane: undefined,
        sagittalPlane: undefined,
        motion: undefined,
      })
    else if (evt.target.name === 'hasComponents') this.setMotionType()
    this.setState({
      [evt.target.name]:
        evt.target.name === 'hasComponents'
          ? evt.target.value === 'true'
          : evt.target.value,
    })
  }

  onSubmit = async () => {
    if (
      this.state.hasComponents === true &&
      this.state.componentExercises?.length === 0
    )
      return this.setState({ error: 'Component Exercises Required' })
    this.props.onSubmit({
      _id: this.props.id,
      name: this.state.name,
      abbreviation: this.state.abbreviation,
      description: this.state.description,
      motionType: {
        componentExercises: this.state.componentExercises,
        transversePlane: this.state.transversePlane,
        kineticChain: this.state.kineticChain,
        verticality: this.state.verticality,
        frontalPlane: this.state.frontalPlane,
        motion: this.state.motion,
        sagittalPlane: this.state.sagittalPlane,
      },
      potentialStages: this.state.potentialStages,
      requirements: this.state.requirements,
    })
  }

  onCancel = () => {
    this.set()
    this.props.onCancel()
  }

  render() {
    return (
      <FormControl fullWidth>
        <Row columns={2}>
          <Text
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            label="Name"
            fullWidth
          />
          <Text
            name="abbreviation"
            value={this.state.abbreviation}
            onChange={this.onChange}
            label="Abbreviation"
            fullWidth
          />
        </Row>
        <Text
          name="description"
          value={this.state.description}
          onChange={this.onChange}
          label="Description"
          fullWidth
          multiline
        />
        <Row columns={7}>
          <Radio
            name="hasComponents"
            options={[
              { label: 'Combinational', value: true },
              { label: 'Singular', value: false },
            ]}
            value={this.state.hasComponents}
            onChange={this.onChange}
          />
          {this.state.hasComponents === true && (
            <Column span={6}>
              <ExerciseSelect
                name="componentExercises"
                value={this.state.componentExercises}
                onChange={this.onChange}
                multiple
                label="Component Exercises"
                unavailable={[this.props.id]}
                fullWidth
              />
            </Column>
          )}
          {this.state.hasComponents === false && (
            <>
              <Select
                name="transversePlane"
                options={[
                  { label: 'Upper', value: 'upper' },
                  { label: 'Lower', value: 'lower' },
                  { label: 'Core', value: 'core' },
                ]}
                value={this.state.transversePlane}
                onChange={this.onChange}
                label="Transverse Plane"
              />
              <Select
                name="frontalPlane"
                options={[
                  { label: 'Push', value: 'push' },
                  { label: 'Pull', value: 'pull' },
                  { label: 'Rotational', value: 'rotational' },
                  { label: 'Lateral', value: 'lateral' },
                ]}
                value={this.state.frontalPlane}
                onChange={this.onChange}
                label="Frontal Plane"
              />
              <Select
                name="verticality"
                options={[
                  { label: 'Horizontal', value: 'horizontal' },
                  { label: 'Vertical', value: 'vertical' },
                ]}
                value={this.state.verticality}
                onChange={this.onChange}
                label="Verticality"
              />
              <Select
                name="motion"
                options={[
                  { label: 'Isometric', value: 'isometric' },
                  { label: 'Isotonic', value: 'isotonic' },
                  { label: 'Distance', value: 'distance' },
                  { label: 'Timed', value: 'timed' },
                ]}
                value={this.state.motion}
                onChange={this.onChange}
                label="Motion"
              />
              <Select
                name="kineticChain"
                options={[
                  { label: 'Closed', value: 'closed' },
                  { label: 'Open', value: 'open' },
                ]}
                value={this.state.kineticChain}
                onChange={this.onChange}
                label="Kinetic Chain"
              />
              <Select
                name="sagittalPlane"
                options={[
                  { label: 'Bilateral', value: 'bilateral' },
                  { label: 'Unilateral', value: 'unilateral' },
                ]}
                value={this.state.sagittalPlane}
                onChange={this.onChange}
                label="Sagittal Plane"
              />
            </>
          )}
        </Row>
        <Row>
          <StageSelect
            name="potentialStages"
            value={this.state.potentialStages}
            onChange={this.onChange}
            multiple
            label="Potential Stages"
          />
          <ExerciseSelect
            name="requirements"
            value={this.state.requirements}
            onChange={this.onChange}
            multiple
            label="Requirements"
            fullWidth
          />
        </Row>
        <ButtonGroup orientation="horizontal">
          <Button onClick={this.onSubmit}>Save</Button>
          <ErrorButton onClick={this.onCancel}>Cancel</ErrorButton>
        </ButtonGroup>
      </FormControl>
    )
  }
}

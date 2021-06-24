import React from 'react'
import { Row, Column, Section } from '../../../style/table'
import { Button, ErrorButton } from '../../../style/buttons'
import { Text, Select, Radio } from '../../../style/inputs'
import StageSelect from '../StageSelect'
import ExerciseSelect from '../ExerciseSelect'
import { ButtonGroup } from '@material-ui/core'

export default class Exercises extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      abbreviation: '',
      description: '',
      componentExercises: [],
      transversePlane: '',
      kineticChain: '',
      verticality: '',
      frontalPlane: '',
      motion: '',
      sagittalPlane: '',
      potentialStages: [],
      requirements: [],
      hasComponents: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.set()
  }

  set = () => {
    if (this.props.exercise) {
      const {
        name,
        abbreviation,
        description,
        motionType,
        potentialStages,
        requirements,
      } = this.props.exercise
      return this.setState({
        name: name || '',
        abbreviation: abbreviation || '',
        description: description || '',
        hasComponents:
          motionType?.componentExercises &&
          motionType?.componentExercises.length > 0
            ? 'combinational'
            : 'singular',
        componentExercises: motionType?.componentExercises || [],
        transversePlane:
          motionType?.transversePlane ||
          (motionType?.componentExercises &&
          motionType?.componentExercises.length > 0
            ? undefined
            : 'upper'),
        kineticChain:
          motionType?.kineticChain ||
          (motionType?.componentExercises &&
          motionType?.componentExercises.length > 0
            ? undefined
            : 'closed'),
        sagittalPlane:
          motionType?.sagittalPlane ||
          (motionType?.componentExercises &&
          motionType?.componentExercises.length > 0
            ? undefined
            : 'bilateral'),
        verticality:
          motionType?.verticality ||
          (motionType?.componentExercises &&
          motionType?.componentExercises.length > 0
            ? undefined
            : 'horizontal'),
        frontalPlane:
          motionType?.frontalPlane ||
          (motionType?.componentExercises &&
          motionType?.componentExercises.length > 0
            ? undefined
            : 'push'),
        motion:
          motionType?.motion ||
          (motionType?.componentExercises &&
          motionType?.componentExercises.length > 0
            ? undefined
            : 'isometric'),
        potentialStages: potentialStages || [],
        requirements: requirements || [],
      })
    }
    this.setState({
      name: '',
      abbreviation: '',
      description: '',
      hasComponents: 'singular',
      componentExercises: [],
      transversePlane: 'upper',
      kineticChain: 'closed',
      sagittalPlane: 'bilateral',
      verticality: 'horizontal',
      frontalPlane: 'push',
      motion: 'isometric',
      potentialStages: [],
      requirements: [],
    })
  }

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value })
  onHasComponentsChange = (evt) => {
    this.onChange(evt)
    if (evt.target.value === 'singular')
      this.setState({
        componentExercises: undefined,
        transversePlane:
          this.props.exercise?.motionType?.transversePlane || 'upper',
        kineticChain: this.props.exercise?.motionType?.kineticChain || 'closed',
        verticality:
          this.props.exercise?.motionType?.verticality || 'horizontal',
        frontalPlane: this.props.exercise?.motionType?.frontalPlane || 'push',
        sagittalPlane:
          this.props.exercise?.motionType?.sagittalPlane || 'bilateral',
        motion: this.props.exercise?.motionType?.motion || 'isometric',
      })
    else if (evt.target.value === 'combinational')
      this.setState({
        componentExercises:
          this.props.exercise?.motionType?.componentExercises || [],
        transversePlane: undefined,
        kineticChain: undefined,
        verticality: undefined,
        frontalPlane: undefined,
        sagittalPlane: undefined,
        motion: undefined,
      })
  }

  onSubmit = async () => {
    if (
      this.state.hasComponents === 'combinational' &&
      this.state.componentExercises &&
      this.state.componentExercises.length === 0
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
      <>
        <Row columns={13}>
          <Text
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            label="Name"
            required
          />
          <Text
            name="abbreviation"
            value={this.state.abbreviation}
            onChange={this.onChange}
            label="Abbreviation"
          />
          <Column span={7}>
            <Section label="Motion Type">
              <Row columns={7}>
                <Radio
                  name="hasComponents"
                  value={this.state.hasComponents}
                  options={[
                    { label: 'Combinational', value: 'combinational' },
                    { label: 'Singular', value: 'singular' },
                  ]}
                  onChange={this.onHasComponentsChange}
                />
                {this.state.hasComponents === 'combinational' && (
                  <Column span={6}>
                    <ExerciseSelect
                      name="componentExercises"
                      onChange={this.onChange}
                      value={this.state.componentExercises}
                      isMulti
                      label="Component Exercises"
                      unavailable={[this.props.id]}
                    />
                  </Column>
                )}
                {this.state.hasComponents === 'singular' && (
                  <Column span={6} columns={6}>
                    <Select
                      name="transversePlane"
                      value={this.state.transversePlane}
                      options={[
                        { label: 'Upper', value: 'upper' },
                        { label: 'Lower', value: 'lower' },
                        { label: 'Core', value: 'core' },
                      ]}
                      onChange={this.onChange}
                      label="Transverse Plane"
                    />
                    <Select
                      name="frontalPlane"
                      value={this.state.frontalPlane}
                      options={[
                        { label: 'Push', value: 'push' },
                        { label: 'Pull', value: 'pull' },
                        { label: 'Rotational', value: 'rotational' },
                        { label: 'Lateral', value: 'lateral' },
                      ]}
                      onChange={this.onChange}
                      label="Frontal Plane"
                    />
                    <Select
                      name="verticality"
                      value={this.state.verticality}
                      options={[
                        { label: 'Horizontal', value: 'horizontal' },
                        { label: 'Vertical', value: 'vertical' },
                      ]}
                      onChange={this.onChange}
                      label="Verticality"
                    />
                    <Select
                      name="motion"
                      value={this.state.motion}
                      options={[
                        { label: 'Isometric', value: 'isometric' },
                        { label: 'Isotonic', value: 'isotonic' },
                        { label: 'Distance', value: 'distance' },
                        { label: 'Timed', value: 'timed' },
                      ]}
                      onChange={this.onChange}
                      label="Motion"
                    />
                    <Select
                      name="kineticChain"
                      value={this.state.kineticChain}
                      options={[
                        { label: 'Closed', value: 'closed' },
                        { label: 'Open', value: 'open' },
                      ]}
                      onChange={this.onChange}
                      label="Kinetic Chain"
                    />
                    <Select
                      name="sagittalPlane"
                      value={this.state.sagittalPlane}
                      options={[
                        { label: 'Bilateral', value: 'bilateral' },
                        { label: 'Unilateral', value: 'unilateral' },
                      ]}
                      onChange={this.onChange}
                      label="Sagittal Plane"
                    />
                  </Column>
                )}
              </Row>
            </Section>
          </Column>
          <StageSelect
            name="potentialStages"
            onChange={this.onChange}
            value={this.state.potentialStages}
            isMulti
            label="Potential Stages"
          />
          <ExerciseSelect
            name="requirements"
            onChange={this.onChange}
            value={this.state.requirements}
            isMulti
            label="Requirements"
          />
          <Text
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            label="Description"
          />
          <ButtonGroup orientation="vertical">
            <Button onClick={this.onSubmit}>Submit</Button>
            <ErrorButton onClick={this.onCancel}>Cancel</ErrorButton>
          </ButtonGroup>
        </Row>
      </>
    )
  }
}

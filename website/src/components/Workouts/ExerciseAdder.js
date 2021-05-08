import React from 'react';
import Select from 'react-select';
import { Error } from '../Notification';
import { Row, Column } from '../../style/table';
import { Button, ErrorButton } from '../../style/buttons';
import { Link } from 'react-router-dom';
import { Text, Radio } from '../../style/inputs';

export default class Exercises extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      abbreviation: '',
      description: '',
      transversePlane: 'upper',
      kineticChain: 'closed',
      verticality: 'horizontal',
      frontalPlane: 'push',
      motion: 'isometric',
      potentialCategories: [],
      requirements: [],
      potentialCategoryOptions: [],
      requirementOptions: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.getWorkoutStages = this.getWorkoutStages.bind(this);
    this.getExercises = this.getExercises.bind(this);
  }

  componentDidMount() {
    this.getExercises();
    this.getWorkoutStages();
  }

  getWorkoutStages = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/workout/stage/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
      }
    );
    const data = await response.json();
    const stages = [];
    data.stages.forEach((stage) =>
      stages.push({ label: stage.name, value: stage._id })
    );
    this.setState({ potentialCategoryOptions: stages });
  };

  getExercises = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/exercise/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    const data = await response.json();
    const exercises = [];
    data.exercises.forEach((exercise) =>
      exercises.push({ label: exercise.name, value: exercise._id })
    );
    this.setState({ requirementOptions: exercises });
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSelectChange = (elements, evt) => {
    const newValues = [];
    elements.forEach((element) => {
      newValues.push(element.value);
    });
    this.setState({ [evt.name]: newValues });
  };

  async onSubmit(evt) {
    evt.preventDefault();
    if (!this.state.name) return this.setState({ error: 'Name is required' });
    if (!this.state.transversePlane)
      return this.setState({ error: 'Transverse Plane is required' });
    if (!this.state.verticality)
      return this.setState({ error: 'Verticality is required' });
    if (!this.state.frontalPlane)
      return this.setState({ error: 'Frontal Plane is required' });
    if (!this.state.kineticChain)
      return this.setState({ error: 'Kinetic Chain is required' });
    if (!this.state.motion)
      return this.setState({ error: 'Motion is required' });
    if (
      !this.state.potentialCategories ||
      this.state.potentialCategories.length === 0
    )
      return this.setState({ error: 'Potential Categories are required' });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/exercise/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          name: this.state.name,
          abbreviation: this.state.abbreviation,
          motionType: {
            transversePlane: this.state.transversePlane,
            verticality: this.state.verticality,
            frontalPlane: this.state.frontalPlane,
            kineticChain: this.state.kineticChain,
            motion: this.state.motion,
          },
          potentialCategories: this.state.potentialCategories,
          requirements: this.state.requirements,
          description: this.state.description,
        }),
      }
    );
    if (response.status === 200) window.location = '/workoutTracker/exercises';
    else {
      const data = await response.json();
      this.setState({ error: data.error });
    }
  }

  render() {
    return (
      <div>
        <Row columns={3}>
          <Column span={3}>
            <Error
              text={this.state.error}
              dismiss={() => this.setState({ error: '' })}
            />
          </Column>
        </Row>
        <Row columns={3}>
          <Column span={2}>Name</Column>
          <Column>
            <Text
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Name"
              required
            />
          </Column>
        </Row>
        <Row columns={3}>
          <Column span={2}>Abbreviation</Column>
          <Column>
            <Text
              name="abbreviation"
              value={this.state.abbreviation}
              onChange={this.onChange}
              placeholder="Abbreviation"
            />
          </Column>
        </Row>
        <Row columns={3}>
          <Column />
          <Column>Transverse Plane</Column>
          <Column>
            <Row columns={2}>
              <Column>
                <Radio
                  id="upper"
                  name="transversePlane"
                  value="upper"
                  checked
                />
              </Column>
              <Column>Upper</Column>
            </Row>
            <Row columns={2}>
              <Column>
                <Radio id="lower" name="transversePlane" value="lower" />
              </Column>
              <Column>Lower</Column>
            </Row>
          </Column>
        </Row>
        <Row columns={3}>
          <Column />
          <Column>Kinetic Chain</Column>
          <Column>
            <Row columns={2}>
              <Column>
                <Radio id="closed" name="kineticChain" value="closed" checked />
              </Column>
              <Column>Closed</Column>
            </Row>
            <Row columns={2}>
              <Column>
                <Radio id="open" name="kineticChain" value="open" />
              </Column>
              <Column>Open</Column>
            </Row>
          </Column>
        </Row>
        <Row columns={3}>
          <Column>Motion Type</Column>
          <Column>Verticality</Column>
          <Column>
            <Row columns={2}>
              <Column>
                <Radio
                  id="horizontal"
                  name="verticality"
                  value="horizontal"
                  checked
                />
              </Column>
              <Column>Horizontal</Column>
            </Row>
            <Row columns={2}>
              <Column>
                <Radio id="vertical" name="verticality" value="vertical" />
              </Column>
              <Column>Vertical</Column>
            </Row>
          </Column>
        </Row>
        <Row columns={3}>
          <Column />
          <Column>Frontal Plane</Column>
          <Column>
            <Row columns={2}>
              <Column>
                <Radio id="push" name="frontalPlane" value="push" checked />
              </Column>
              <Column>Push</Column>
            </Row>
            <Row columns={2}>
              <Column>
                <Radio id="pull" name="frontalPlane" value="pull" />
              </Column>
              <Column>Pull</Column>
            </Row>
          </Column>
        </Row>
        <Row columns={3}>
          <Column />
          <Column>Motion</Column>
          <Column>
            <Row columns={2}>
              <Column>
                <Radio id="isometric" name="motion" value="isometric" checked />
              </Column>
              <Column>Isometric</Column>
            </Row>
            <Row columns={2}>
              <Column>
                <Radio id="isotonic" name="motion" value="isotonic" />
              </Column>
              <Column>Isotonic</Column>
            </Row>
          </Column>
        </Row>
        <Row columns={3}>
          <Column span={2}>Potential Stages</Column>
          <Column>
            <Select
              options={this.state.potentialCategoryOptions}
              name="potentialCategories"
              onChange={this.onSelectChange}
              isMulti
            />
          </Column>
        </Row>
        <Row columns={3}>
          <Column span={2}>Requirements</Column>
          <Column>
            <Select
              options={this.state.requirementOptions}
              name="requirements"
              onChange={this.onSelectChange}
              isMulti
            />
          </Column>
        </Row>
        <Row columns={3}>
          <Column span={2}>Description</Column>
          <Column>
            <Text
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              placeholder="Description"
            />
          </Column>
        </Row>
        <Row columns={3}>
          <Column span={3}>
            <Button onClick={this.onSubmit}>Submit</Button>
          </Column>
        </Row>
        <Row columns={3}>
          <Column span={3}>
            <Link to="/workoutTracker/exercises">
              <ErrorButton>Cancel</ErrorButton>
            </Link>
          </Column>
        </Row>
      </div>
    );
  }
}

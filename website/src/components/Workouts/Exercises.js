import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Column } from '../../style/table';
import { Button } from '../../style/buttons';

export default class Exercises extends React.Component {
  constructor() {
    super();
    this.state = {
      exercises: [],
    };
    this.getExercises = this.getExercises.bind(this);
  }

  componentDidMount() {
    this.getExercises();
  }

  getExercises = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/exercise/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    const data = await response.json();
    this.setState({ exercises: data.exercises });
  };

  render() {
    let exercises = [];
    for (const exercise of this.state.exercises)
      exercises.push(
        <Row key={exercise._id} columns={10}>
          <Column>{exercise.name}</Column>
          <Column>{exercise.abbreviation}</Column>
          <Column span={5} columns={5}>
            <Column>{exercise.motionType.transversePlane}</Column>
            <Column>{exercise.motionType.kineticChain}</Column>
            <Column>{exercise.motionType.verticality}</Column>
            <Column>{exercise.motionType.frontalPlane}</Column>
            <Column>{exercise.motionType.motion}</Column>
          </Column>
          <Column>{exercise.potentialCategories}</Column>
          <Column>{exercise.requirements}</Column>
          <Column>{exercise.description}</Column>
        </Row>
      );
    return (
      <div>
        <Row columns={10} isTitle>
          <Column>Name</Column>
          <Column>Abbreviation</Column>
          <Column span={5}>
            <Column span={5}>Motion Type</Column>
            <Column span={5} columns={5}>
              <Column>Transverse Plane</Column>
              <Column>Kinetic Chain</Column>
              <Column>Verticality</Column>
              <Column>Frontal Plane</Column>
              <Column>Motion</Column>
            </Column>
          </Column>
          <Column>Potential Categories</Column>
          <Column>Requirements</Column>
          <Column>Description</Column>
        </Row>
        <Row columns={10}>
          <Column span={10}>
            <Link to="/workoutTracker/exercises/new">
              <Button>+</Button>
            </Link>
          </Column>
        </Row>
        {exercises}
      </div>
    );
  }
}

import React from "react";
import styles from "./Exercises.module.css";
import { Link } from 'react-router-dom';

export default class Exercises extends React.Component {
  constructor() {
    super();
    this.state = {
      exercises: []
    };
  }

  componentDidMount() {
    this.getExercises();
  }

  getExercises = async () => {
    const response = await fetch(
      `${window.env.API_URL}/exercise/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
      }
    );
    const data = await response.json();
    this.setState({ exercises: data.exercises });
  };

  render() {
    let exercises = [];
    for (const exercise of this.state.exercises)
      exercises.push(
        <div key={exercise._id} className={`${styles.row}`}>
          <div className={`${styles.column} ${styles.name}`}>{exercise.name}</div>
          <div className={`${styles.column} ${styles.abbreviation}`}>{exercise.abbreviation}</div>
          <div className={`${styles.column} ${styles.motionType} ${styles.motionTypeSplit}`}>
              <div>{exercise.motionType.transversePlane}</div>
              <div>{exercise.motionType.kineticChain}</div>
              <div>{exercise.motionType.verticality}</div>
              <div>{exercise.motionType.frontalPlane}</div>
              <div>{exercise.motionType.motion}</div>
          </div>
          <div className={`${styles.column} ${styles.potentialCategories}`}>{exercise.potentialCategories}</div>
          <div className={`${styles.column} ${styles.requirements}`}>{exercise.requirements}</div>
          <div className={`${styles.column} ${styles.description}`}>{exercise.description}</div>
        </div>
      );
    return (
      <div className={`${styles.exercises}`}>
        <div className={`${styles.row} ${styles.title}`}>
          <div className={`${styles.column} ${styles.name}`}>Name</div>
          <div className={`${styles.column} ${styles.abbreviation}`}>Abbreviation</div>
          <div className={`${styles.column} ${styles.motionType}`}>
            <div>
              Motion Type
            </div>
            <div className={`${styles.motionTypeSplit}`}>
              <div>Transverse Plane</div>
              <div>Kinetic Chain</div>
              <div>Verticality</div>
              <div>Frontal Plane</div>
              <div>Motion</div>
            </div>
          </div>
          <div className={`${styles.column} ${styles.potentialCategories}`}>Potential Categories</div>
          <div className={`${styles.column} ${styles.requirements}`}>Requirements</div>
          <div className={`${styles.column} ${styles.description}`}>Description</div>
        </div>
        <div className={`${styles.row}`}>
          <Link to="/workoutTracker/exercises/new" className={styles.fullWidth}>
            <div className={`button`}>
              +
            </div>
          </Link>
        </div>
        {exercises}
      </div>
    );
  }
}

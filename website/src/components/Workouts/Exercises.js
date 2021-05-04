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
        <div key={exercise.id} className={`${styles.row}`}>
          <div className={`${styles.column} ${styles.c1}`}>{exercise.name}</div>
          <div className={`${styles.column} ${styles.c2}`}>{exercise.abbreviation}</div>
          <div className={`${styles.column} ${styles.c3}`}>{exercise.motionType.transversePlane} {exercise.motionType.kineticChain} {exercise.motionType.verticality} {exercise.motionType.frontalPlane} {exercise.motionType.motion}</div>
          <div className={`${styles.column} ${styles.c4}`}>{exercise.potentialCategories}</div>
          <div className={`${styles.column} ${styles.c5}`}>{exercise.requirements}</div>
          <div className={`${styles.column} ${styles.c6}`}>{exercise.description}</div>
        </div>
      );
    return (
      <div className={`${styles.exercises}`}>
        <div className={`${styles.row} ${styles.title}`}>
          <div className={`${styles.column} ${styles.c1}`}>Name</div>
          <div className={`${styles.column} ${styles.c2}`}>Abbreviation</div>
          <div className={`${styles.column} ${styles.c3}`}>Motion Type</div>
          <div className={`${styles.column} ${styles.c4}`}>Potential Categories</div>
          <div className={`${styles.column} ${styles.c5}`}>Requirements</div>
          <div className={`${styles.column} ${styles.c6}`}>Description</div>
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

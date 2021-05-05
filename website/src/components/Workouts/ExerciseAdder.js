import React from "react";
import styles from './ExerciseAdder.module.css';

export default class Exercises extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onSubmit() {
    console.log("submit")
  }

  onCancel() {
    console.log("cancel")
  }

  render() {
    return (
      <div className={styles.table}>
        <div className={styles.label}>Name</div>
        <div>hi</div>
        <div className={styles.label}>Abbreviation</div>
        <div>hi</div>
        <div className={`${styles.label} ${styles.motionType} ${styles.motionTypeTitle}`}>Motion Type</div>
        <div className={`${styles.label} ${styles.motionType}`}>Transverse Plane</div>
        <div>hi</div>
        <div className={`${styles.label} ${styles.motionType}`}>Kinetic Chain</div>
        <div>hi</div>
        <div className={`${styles.label} ${styles.motionType}`}>Verticality</div>
        <div>hi</div>
        <div className={`${styles.label} ${styles.motionType}`}>Frontal Plane</div>
        <div>hi</div>
        <div className={`${styles.label} ${styles.motionType}`}>Motion</div>
        <div>hi</div>
        <div className={styles.label}>Potential Categories</div>
        <div>hi</div>
        <div className={styles.label}>Requirements</div>
        <div>hi</div>
        <div className={styles.label}>Description</div>
        <div>hi</div>
        <div className={`button ${styles.fullWidth}`} onClick={this.onSubmit}>Submit</div>
        <div className={`errorButton secondaryButton button ${styles.fullWidth}`} onClick={this.onCancel}>Cancel</div>
      </div>
    );
  }
}

// _id: "1",
// name: "planche",
// abbreviation: "pl",
// motionType: {
//   transversePlane: "upper",
//   kineticChain: "closed",
//   verticality: "horizontal",
//   frontalPlane: "push",
//   motion: "isometric"
// },
// potentialCategories: [
//   "skill"
// ],
// requirements: [],
// description : ""
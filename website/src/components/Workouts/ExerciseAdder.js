import React from "react";
import styles from './ExerciseAdder.module.css';
import Select from 'react-select';

export default class Exercises extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      abbreviation: "",
      description: "",
      transversePlane: "upper",
      kineticChain: "closed",
      verticality: "horizontal",
      frontalPlane: "push",
      motion: "isometric",
      potentialCategories: [],
      requirements: [],
      potentialCategoryOptions: [],
      requirementOptions: []
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
      `${window.env.API_URL}/workout/stages/`,
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
    data.stages.forEach((stage) => stages.push({ label: stage.name, value: stage._id }));
    this.setState({ potentialCategoryOptions: stages });
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
    const exercises = [];
    data.exercises.forEach((exercise) => exercises.push({ label: exercise.name, value: exercise._id }));
    this.setState({ requirementOptions: exercises });
  }

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSelectChange = (elements, evt) => {
    const newValues = [];
    elements.forEach((element) => {
      newValues.push(element.value);
    })
    this.setState({ [evt.name]: newValues });
  }
  
  async onSubmit(evt) {
    evt.preventDefault();
    //TODO make sure required items are filled
    // if (!this.state.email) return this.setState({ error: 'Email is required' });
    const response = await fetch(`${window.env.API_URL}/exercise/add`, {
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
          motion: this.state.motion
        },
        potentialCategories: this.state.potentialCategories,
        requirements: this.state.requirements,
        description: this.state.description
      }),
    })
    console.log(response)
    //TODO only if response 200
    window.location = "/workoutTracker/exercises";
  }

  render() {
    return (
      <form className={styles.table} onSubmit={this.onSubmit}>
        <div className={styles.label}>Name</div>
        <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.onChange}
          placeholder="Name"
          required
          />
        <div className={styles.label}>Abbreviation</div>
        <input
          name="abbreviation"
          type="text"
          value={this.state.abbreviation}
          onChange={this.onChange}
          placeholder="Abbreviation"
          />
        <div className={`${styles.label} ${styles.motionType} ${styles.motionTypeTitle}`}>Motion Type</div>
        <div className={`${styles.label} ${styles.motionType}`}>Transverse Plane</div>
        <div>
          <div>
            <input type="radio" id="upper" name="transversePlane" value="upper" checked/>
            Upper
          </div>
          <div>
            <input type="radio" id="lower" name="transversePlane" value="lower"/>
            Lower
          </div>
        </div>
        <div className={`${styles.label} ${styles.motionType}`}>Kinetic Chain</div>
        <div>
          <div>
            <input type="radio" id="closed" name="kineticChain" value="closed" checked/>
            Closed
          </div>
          <div>
            <input type="radio" id="open" name="kineticChain" value="open"/>
            Open
          </div>
        </div>
        <div className={`${styles.label} ${styles.motionType}`}>Verticality</div>
        <div>
          <div>
            <input type="radio" id="horizontal" name="verticality" value="horizontal" checked/>
            Horizontal
          </div>
          <div>
            <input type="radio" id="vertical" name="verticality" value="vertical"/>
            Vertical
          </div>
        </div>
        <div className={`${styles.label} ${styles.motionType}`}>Frontal Plane</div>
        <div>
          <div>
            <input type="radio" id="push" name="frontalPlane" value="push" checked/>
            Push
          </div>
          <div>
            <input type="radio" id="pull" name="frontalPlane" value="pull"/>
            Pull
          </div>
        </div>
        <div className={`${styles.label} ${styles.motionType}`}>Motion</div>
        <div>
          <div>
            <input type="radio" id="isometric" name="motion" value="isometric" checked/>
            Isometric
          </div>
          <div>
            <input type="radio" id="isotonic" name="motion" value="isotonic"/>
            Isotonic
          </div>
        </div>
        <div className={styles.label}>Potential Categories</div>
        <Select options={this.state.potentialCategoryOptions} name="potentialCategories" onChange={this.onSelectChange} isMulti/>
        <div className={styles.label}>Requirements</div>
        <Select options={this.state.requirementOptions} name="requirements" onChange={this.onSelectChange} isMulti/>
        <div className={styles.label}>Description</div>
        <input
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.onChange}
          placeholder="Description"
          />
        <input type="submit" className={`primaryButton button ${styles.fullWidth}`} value="Submit"/>
        <a className={`errorButton secondaryButton button ${styles.fullWidth}`} href="/workoutTracker/exercises">Cancel</a>
      </form>
    );
  }
}
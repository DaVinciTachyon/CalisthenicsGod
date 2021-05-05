import React from "react";
import styles from "../../style/Stages.module.css";
import StageAdder from './StageAdder';

export default class Stages extends React.Component {
  constructor() {
    super();
    this.state = {
      stages: []
    };
    this.getStages = this.getStages.bind(this);
  }

  componentDidMount() {
    this.getStages();
  }

  getStages = async () => {
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
    this.setState({ stages: data.stages });
  };

  render() {
    let stages = [];
    for(let i = 0; i < this.state.stages.length; i++) {
        const stage = this.state.stages[i];
        stages.push(
            <div>
                <div key={stage._id} className={`${styles.row}`}>
                    <div className={`${styles.column} ${styles.name}`}>{stage.name}</div>
                    <div className={`${styles.column} ${styles.description}`}>{stage.description}</div>
                    <div className={`${styles.column} ${styles.submit}`}></div>
                </div>
                <StageAdder index={i+1} />
            </div>
        );
    }
    return (
      <div className={`${styles.stages}`}>
        <div className={`${styles.row} ${styles.title}`}>
          <div className={`${styles.column} ${styles.name}`}>Name</div>
          <div className={`${styles.column} ${styles.description}`}>Description</div>
          <div className={`${styles.column} ${styles.submit}`}></div>
        </div>
        <StageAdder index={0} />
        {stages}
      </div>
    );
  }
}

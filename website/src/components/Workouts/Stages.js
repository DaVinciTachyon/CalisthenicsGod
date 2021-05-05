import React from "react";
import styles from "../../style/Stages.module.css";

export default class Stages extends React.Component {
  constructor() {
    super();
    this.state = {
      stages: []
    };
  }

  render() {
    let stages = [];
    for (const stage of this.state.stages)
      stages.push(
        <div key={stage._id} className={`${styles.row}`}>
          <div className={`${styles.column} ${styles.name}`}>{stage.name}</div>
          <div className={`${styles.column} ${styles.description}`}>{stage.description}</div>
        </div>
      );
    return ( //FIXME add
      <div className={`${styles.stages}`}>
        <div className={`${styles.row} ${styles.title}`}>
          <div className={`${styles.column} ${styles.name}`}>Name</div>
          <div className={`${styles.column} ${styles.description}`}>Description</div>
        </div>
        <div className={`${styles.row} ${styles.fullWidth}`}> 
            <div className={`button`}>
                +
            </div>
        </div>
        {stages}
      </div>
    );
  }
}

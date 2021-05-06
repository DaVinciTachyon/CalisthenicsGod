import React from 'react';
import styles from '../style/Error.module.css';
import generalStyles from '../style/General.module.css';

export default class Error extends React.Component {
  dismissError = () => {
    this.props.dismissError();
  };

  render() {
    if (this.props.error)
      return (
        <div
          data-test="error"
          onClick={this.dismissError}
          className={`${this.props.className} ${styles.error} ${generalStyles.notification}`}
        >
          <div className={styles.text}>{this.props.error}</div>
          <div onClick={this.dismissError} className={styles.button}>
            ✖
          </div>
        </div>
      );
    else return <></>;
  }
}

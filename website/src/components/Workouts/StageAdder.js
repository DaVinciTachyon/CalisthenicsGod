import React from "react";
import stageStyles from "../../style/Stages.module.css";
import styles from "../../style/StageAdder.module.css";
import Error from '../Error';

export default class StageAdder extends React.Component {
    constructor() {
        super();
        this.state = {
            isAdding: false,
            name: "",
            description: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

    onSubmit = async (evt) => {
        evt.preventDefault();
        if (!this.state.name) return this.setState({ error: 'Name is required' });
        if (this.props.index < 0 || this.props.index % 1 !== 0) return this.setState({ error: 'Chronological Ranking is invalid' });
        const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/stage/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken'),
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                chronologicalRanking: this.props.index
            }),
        })
        const data = await response.json();
        console.log(data)
        if(response.status === 200) {
            this.setState({ isAdding: false })
            window.location.reload();
        } else
            this.setState({ error: data.error });
    }

    render() {
        if(!this.state.isAdding)
            return (
                <div className={`${stageStyles.row}`}> 
                    <div className={`thinButton button ${stageStyles.fullWidth}`} onClick={() => this.setState({ isAdding: true})}>
                        +
                    </div>
                </div>
            );
        else
            return (
                <>
                    <Error error={this.state.error} dismissError={() => this.setState({ error: '' })}/>
                    <form className={`${stageStyles.row}`} onSubmit={this.onSubmit}>
                        <input name="name" className={styles.name} type="text" value={this.state.name} onChange={this.onChange}/>
                        <input name="description" className={styles.description} type="text" value={this.state.description} onChange={this.onChange}/>
                        <input type="submit" className="primaryButton button"/>
                    </form>
                </>
            );
    }
}

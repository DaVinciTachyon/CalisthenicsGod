import React from 'react';
import { Error } from '../../../style/notification';
import { Row, Column } from '../../../style/table';
import { Button, ErrorButton } from '../../../style/buttons';
import { Text } from '../../../style/inputs';

export default class StageAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
      name: '',
      description: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  set = () =>
    this.setState({
      isAdding: false,
      name: '',
      description: '',
    });

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSubmit = async (evt) => {
    evt.preventDefault();
    if (!this.state.name) return this.setState({ error: 'Name is required' });
    if (this.props.index < 0 || this.props.index % 1 !== 0)
      return this.setState({ error: 'Chronological Ranking is invalid' });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/workout/stage/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          name: this.state.name,
          description: this.state.description,
          chronologicalRanking: this.props.index,
        }),
      }
    );
    if (response.status === 200) {
      await this.setState({ isAdding: false });
      window.location.reload();
    } else {
      const data = await response.json();
      this.setState({ error: data.error });
    }
  };

  render() {
    if (!this.state.isAdding)
      return (
        <Button
          onClick={() => this.setState({ isAdding: true })}
          className="maxWidth thin"
        >
          +
        </Button>
      );
    else
      return (
        <>
          <Error
            text={this.state.error}
            dismiss={() => this.setState({ error: '' })}
          />
          <Row columns={5}>
            <Column span={2}>
              <Text
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </Column>
            <Column span={2}>
              <Text
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
            </Column>
            <Column>
              <Button onClick={this.onSubmit}>Submit</Button>
              <ErrorButton onClick={this.set}>Cancel</ErrorButton>
            </Column>
          </Row>
        </>
      );
  }
}

import React from 'react';
import { Error } from '../../style/notification';
import { Row, Column } from '../../style/table';
import { Button } from '../../style/buttons';
import { Text } from '../../style/inputs';

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
      this.setState({ isAdding: false });
      window.location.reload();
    } else {
      const data = await response.json();
      this.setState({ error: data.error });
    }
  };

  render() {
    if (!this.state.isAdding)
      return (
        <Row columns={3}>
          <Column span={3}>
            <Button onClick={() => this.setState({ isAdding: true })}>+</Button>
          </Column>
        </Row>
      );
    else
      return (
        <>
          <Row columns={3}>
            <Column span={3}>
              <Error
                text={this.state.error}
                dismiss={() => this.setState({ error: '' })}
              />
            </Column>
          </Row>
          <Row columns={3}>
            <Column>
              <Text
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </Column>
            <Column>
              <Text
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
            </Column>
            <Column>
              <Button onClick={this.onSubmit}>Submit</Button>
            </Column>
          </Row>
        </>
      );
  }
}

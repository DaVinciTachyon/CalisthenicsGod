import React from 'react';
import { Error } from '../../../style/notification';
import { Row, Column } from '../../../style/table';
import { Button, ErrorButton } from '../../../style/buttons';
import { Text } from '../../../style/inputs';
import axios from 'axios';

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

  onSubmit = async () => {
    if (!this.state.name) return this.setState({ error: 'Name is required' });
    if (this.props.index < 0 || this.props.index % 1 !== 0)
      return this.setState({ error: 'Chronological Ranking is invalid' });
    try {
      await axios.post('/workout/stage/', {
        name: this.state.name,
        description: this.state.description,
        chronologicalRanking: this.props.index,
      });
      await this.setState({ isAdding: false });
      window.location.reload();
    } catch (err) {
      if (err.response?.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
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

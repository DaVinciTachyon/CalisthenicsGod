import React from 'react';
import { Row, Column } from '../../style/table';
import { Button, ErrorButton } from '../../style/buttons';
import { Text, Radio } from '../../style/inputs';
import StageSelect from './StageSelect';
import ExerciseSelect from './ExerciseSelect';

export default class Exercises extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      abbreviation: '',
      description: '',
      transversePlane: '',
      kineticChain: '',
      verticality: '',
      frontalPlane: '',
      motion: '',
      potentialStages: [],
      requirements: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.set();
  }

  set = () => {
    if (this.props.exercise)
      this.setState({
        name: this.props.exercise.name || '',
        abbreviation: this.props.exercise.abbreviation || '',
        description: this.props.exercise.description || '',
        transversePlane:
          this.props.exercise.motionType.transversePlane || 'upper',
        kineticChain: this.props.exercise.motionType.kineticChain || 'closed',
        verticality: this.props.exercise.motionType.verticality || 'horizontal',
        frontalPlane: this.props.exercise.motionType.frontalPlane || 'push',
        motion: this.props.exercise.motionType.motion || 'isometric',
        potentialStages: this.props.exercise.potentialStages || [],
        requirements: this.props.exercise.requirements || [],
      });
    else
      this.setState({
        name: '',
        abbreviation: '',
        description: '',
        transversePlane: 'upper',
        kineticChain: 'closed',
        verticality: 'horizontal',
        frontalPlane: 'push',
        motion: 'isometric',
        potentialStages: [],
        requirements: [],
      });
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSelectChange = (name, value) => this.setState({ [name]: value });

  async onSubmit(evt) {
    evt.preventDefault();
    if (!this.state.name) return this.setState({ error: 'Name is required' });
    if (!this.state.transversePlane)
      return this.setState({ error: 'Transverse Plane is required' });
    if (!this.state.verticality)
      return this.setState({ error: 'Verticality is required' });
    if (!this.state.frontalPlane)
      return this.setState({ error: 'Frontal Plane is required' });
    if (!this.state.kineticChain)
      return this.setState({ error: 'Kinetic Chain is required' });
    if (!this.state.motion)
      return this.setState({ error: 'Motion is required' });
    if (!this.state.potentialStages || this.state.potentialStages.length === 0)
      return this.setState({ error: 'Potential Stages are required' });
    this.props.onSubmit({
      _id: this.props.id || undefined,
      name: this.state.name,
      abbreviation: this.state.abbreviation,
      description: this.state.description,
      motionType: {
        transversePlane: this.state.transversePlane,
        kineticChain: this.state.kineticChain,
        verticality: this.state.verticality,
        frontalPlane: this.state.frontalPlane,
        motion: this.state.motion,
      },
      potentialStages: this.state.potentialStages,
      requirements: this.state.requirements,
    });
  }

  onCancel = () => {
    this.set();
    this.props.onCancel();
  };

  render() {
    return (
      <Row columns={11}>
        <Column>
          <Text
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            placeholder="Name"
            required
          />
        </Column>
        <Column>
          <Text
            name="abbreviation"
            value={this.state.abbreviation}
            onChange={this.onChange}
            placeholder="Abbreviation"
          />
        </Column>
        <Column>
          <Row columns={2}>
            <Column>
              <Radio
                id="upper"
                name="transversePlane"
                value="upper"
                checked={this.state.transversePlane === 'upper'}
                onClick={this.onChange}
              />
            </Column>
            <Column>Upper</Column>
          </Row>
          <Row columns={2}>
            <Column>
              <Radio
                id="lower"
                name="transversePlane"
                value="lower"
                checked={this.state.transversePlane === 'lower'}
                onClick={this.onChange}
              />
            </Column>
            <Column>Lower</Column>
          </Row>
        </Column>
        <Column>
          <Row columns={2}>
            <Column>
              <Radio
                id="closed"
                name="kineticChain"
                value="closed"
                checked={this.state.kineticChain === 'closed'}
                onClick={this.onChange}
              />
            </Column>
            <Column>Closed</Column>
          </Row>
          <Row columns={2}>
            <Column>
              <Radio
                id="open"
                name="kineticChain"
                value="open"
                checked={this.state.kineticChain === 'open'}
                onClick={this.onChange}
              />
            </Column>
            <Column>Open</Column>
          </Row>
        </Column>
        <Column>
          <Row columns={2}>
            <Column>
              <Radio
                id="horizontal"
                name="verticality"
                value="horizontal"
                checked={this.state.verticality === 'horizontal'}
                onClick={this.onChange}
              />
            </Column>
            <Column>Horizontal</Column>
          </Row>
          <Row columns={2}>
            <Column>
              <Radio
                id="vertical"
                name="verticality"
                value="vertical"
                checked={this.state.verticality === 'vertical'}
                onClick={this.onChange}
              />
            </Column>
            <Column>Vertical</Column>
          </Row>
        </Column>
        <Column>
          <Row columns={2}>
            <Column>
              <Radio
                id="push"
                name="frontalPlane"
                value="push"
                checked={this.state.frontalPlane === 'push'}
                onClick={this.onChange}
              />
            </Column>
            <Column>Push</Column>
          </Row>
          <Row columns={2}>
            <Column>
              <Radio
                id="pull"
                name="frontalPlane"
                value="pull"
                checked={this.state.frontalPlane === 'pull'}
                onClick={this.onChange}
              />
            </Column>
            <Column>Pull</Column>
          </Row>
        </Column>
        <Column>
          <Row columns={2}>
            <Column>
              <Radio
                id="isometric"
                name="motion"
                value="isometric"
                checked={this.state.motion === 'isometric'}
                onClick={this.onChange}
              />
            </Column>
            <Column>Isometric</Column>
          </Row>
          <Row columns={2}>
            <Column>
              <Radio
                id="isotonic"
                name="motion"
                value="isotonic"
                checked={this.state.motion === 'isotonic'}
                onClick={this.onChange}
              />
            </Column>
            <Column>Isotonic</Column>
          </Row>
        </Column>
        <Column>
          <StageSelect
            name="potentialStages"
            onChange={this.onSelectChange}
            defaultValue={this.state.potentialStages}
          />
        </Column>
        <Column>
          <ExerciseSelect
            name="requirements"
            onChange={this.onSelectChange}
            defaultValue={this.state.requirements}
          />
        </Column>
        <Column>
          <Text
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            placeholder="Description"
          />
        </Column>
        <Column>
          <Button onClick={this.onSubmit}>Submit</Button>
          <ErrorButton onClick={this.onCancel}>Cancel</ErrorButton>
        </Column>
      </Row>
    );
  }
}

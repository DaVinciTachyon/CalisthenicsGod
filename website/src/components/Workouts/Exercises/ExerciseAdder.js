import React from 'react';
import { Row, Column } from '../../../style/table';
import { Button, ErrorButton } from '../../../style/buttons';
import { Text, Radio } from '../../../style/inputs';
import StageSelect from '../StageSelect';
import ExerciseSelect from '../ExerciseSelect';

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

  onChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    if (evt.target.name === 'motion' && evt.target.value === 'distance')
      this.setState({
        transversePlane: undefined,
        kineticChain: undefined,
        verticality: undefined,
        frontalPlane: undefined,
      });
    else if (evt.target.name === 'motion')
      this.setState({
        transversePlane: 'upper',
        kineticChain: 'closed',
        verticality: 'horizontal',
        frontalPlane: 'push',
      });
  };

  onSelectChange = (evt) => this.setState({ [evt.name]: evt.value });

  async onSubmit(evt) {
    evt.preventDefault();
    if (!this.state.name) return this.setState({ error: 'Name is required' });
    if (!this.state.motion)
      return this.setState({ error: 'Motion is required' });
    if (this.state.motion !== 'distance') {
      if (!this.state.transversePlane)
        return this.setState({ error: 'Transverse Plane is required' });
      if (!this.state.verticality)
        return this.setState({ error: 'Verticality is required' });
      if (!this.state.frontalPlane)
        return this.setState({ error: 'Frontal Plane is required' });
      if (!this.state.kineticChain)
        return this.setState({ error: 'Kinetic Chain is required' });
    }
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
            required
          />
        </Column>
        <Column>
          <Text
            name="abbreviation"
            value={this.state.abbreviation}
            onChange={this.onChange}
          />
        </Column>
        <Column>
          <Radio
            name="motion"
            value={this.state.motion}
            options={[
              { label: 'Isometric', value: 'isometric' },
              { label: 'Isotonic', value: 'isotonic' },
              { label: 'Distance', value: 'distance' },
            ]}
            onChange={this.onChange}
          />
        </Column>
        {this.state.motion === 'distance' && <Column span={4} />}
        {this.state.motion !== 'distance' && (
          <>
            <Column>
              <Radio
                name="transversePlane"
                value={this.state.transversePlane}
                options={[
                  { label: 'Upper', value: 'upper' },
                  { label: 'Lower', value: 'lower' },
                ]}
                onChange={this.onChange}
              />
            </Column>
            <Column>
              <Radio
                name="kineticChain"
                value={this.state.kineticChain}
                options={[
                  { label: 'Closed', value: 'closed' },
                  { label: 'Open', value: 'open' },
                ]}
                onChange={this.onChange}
              />
            </Column>
            <Column>
              <Radio
                name="verticality"
                value={this.state.verticality}
                options={[
                  { label: 'Horizontal', value: 'horizontal' },
                  { label: 'Vertical', value: 'vertical' },
                ]}
                onChange={this.onChange}
              />
            </Column>
            <Column>
              <Radio
                name="frontalPlane"
                value={this.state.frontalPlane}
                options={[
                  { label: 'Push', value: 'push' },
                  { label: 'Pull', value: 'pull' },
                ]}
                onChange={this.onChange}
              />
            </Column>
          </>
        )}
        <Column>
          <StageSelect
            name="potentialStages"
            onChange={this.onSelectChange}
            defaultValue={this.state.potentialStages}
            isMulti
          />
        </Column>
        <Column>
          <ExerciseSelect
            name="requirements"
            onChange={this.onSelectChange}
            defaultValue={this.state.requirements}
            isMulti
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
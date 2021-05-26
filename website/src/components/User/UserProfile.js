import React from 'react';
import { Row, Column } from '../../style/table';
import { Button } from '../../style/buttons';
import {
  Calories,
  Text,
  Date as DateInput,
  Select,
  Range,
} from '../../style/inputs';

export default class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      calorieOffset: 0,
      currentCalorieOffset: 0,
      calorieMode: 'maintenance',
      name: '',
      email: '',
      dateJoined: '',
      birthDate: '',
      gender: '',
      weight: 0,
      caloriesPerKg: 0,
      proteinGramsPerKg: 0,
      fatCalorieProportion: 0,
    };
  }

  formatDate = (date) =>
    `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    const data = await response.json();
    this.setState({
      name: data.name,
      email: data.email,
      dateJoined: this.formatDate(new Date(data.dateJoined)),
      birthDate: this.formatDate(new Date(data.birthDate)),
      gender: data.gender,
      weight: data.weight,
      caloriesPerKg: data.caloriesPerKg,
      proteinGramsPerKg: data.proteinGramsPerKg,
      fatCalorieProportion: data.fatCalorieProportion,
      calorieOffset: data.calorieOffset,
      currentCalorieOffset: data.calorieOffset,
      calorieMode:
        data.calorieOffset > 0
          ? 'bulk'
          : data.calorieOffset < 0
          ? 'deficit'
          : 'maintenance',
    });
  };

  onCalorieModeChange = (evt) => {
    this.onSelectChange(evt);
    this.setState({
      calorieOffset:
        evt.value === 'deficit'
          ? this.state.currentCalorieOffset < 0
            ? this.state.currentCalorieOffset
            : -300
          : evt.value === 'bulk'
          ? this.state.currentCalorieOffset > 0
            ? this.state.currentCalorieOffset
            : 200
          : 0,
    });
  };

  onSubmit = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/nutrition/userInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        calorieOffset: this.state.calorieOffset,
        caloriesPerKg: this.state.caloriesPerKg,
        proteinGramsPerKg: this.state.proteinGramsPerKg,
        fatCalorieProportion: this.state.fatCalorieProportion,
      }),
    });
    this.getUserInfo();
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });
  onSelectChange = (evt) => this.setState({ [evt.name]: evt.value });

  render() {
    return (
      <div>
        <Text label="First Name" value={this.state.name.first} readOnly />
        <Text label="Middle Name" value={this.state.name.middle} readOnly />
        <Text label="Last Name" value={this.state.name.last} readOnly />
        <Text label="Email" value={this.state.email} readOnly />
        <Row columns={2}>
          <Column span={this.state.calorieOffset === 0 ? 2 : 1}>
            <Select
              name="calorieMode"
              options={[
                { label: 'Maintenance', value: 'maintenance' },
                { label: 'Deficit', value: 'deficit' },
                { label: 'Bulk', value: 'bulk' },
              ]}
              value={this.state.calorieMode}
              onChange={this.onCalorieModeChange}
              label="Calorie Mode"
            />
          </Column>
          {this.state.calorieOffset !== 0 && (
            <Calories
              name="calorieOffset"
              value={
                (this.state.calorieMode === 'deficit' ? -1 : 1) *
                this.state.calorieOffset
              }
              onChange={(evt) => {
                evt.target.value *=
                  this.state.calorieMode === 'deficit' ? -1 : 1;
                this.onChange(evt);
              }}
            />
          )}
        </Row>
        <Calories
          value={this.state.caloriesPerKg * this.state.weight}
          label="Maintenance Calories"
          unit="kcal"
          readOnly
        />
        <Range
          value={this.state.caloriesPerKg}
          min={28}
          max={52}
          step={1}
          label="Calories Per Kilogram of Bodyweight"
          unit="kcal"
          name="caloriesPerKg"
          onChange={this.onChange}
        />
        <Range
          value={this.state.proteinGramsPerKg}
          min={1}
          max={3}
          step={0.1}
          label="Protein Amount"
          unit="g/kg"
          name="proteinGramsPerKg"
          onChange={this.onChange}
        />
        <Range
          value={this.state.fatCalorieProportion}
          min={0.15}
          max={0.5}
          step={0.01}
          label="Fat Partition"
          unit="%"
          name="fatCalorieProportion"
          onChange={this.onChange}
          isPercentage
        />
        <Select
          name="gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          value={this.state.gender}
          onChange={this.onChange}
          label="Gender"
          readOnly
        />
        <DateInput value={this.state.birthDate} label="Birth Date" readOnly />
        <DateInput value={this.state.dateJoined} label="Date Joined" readOnly />
        <Row>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Row>
      </div>
    );
  }
}

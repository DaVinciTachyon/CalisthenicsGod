import React from 'react';
import { Row, Section } from '../../style/table';
import { Button } from '../../style/buttons';
import {
  Calories,
  Text,
  Date as DateInput,
  Select,
  Range,
} from '../../style/inputs';
import { Success, Error } from '../../style/notification';
import axios from 'axios';

export default class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      calorieOffset: 0,
      currentCalorieOffset: 0,
      calorieMode: 'maintenance',
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      dateJoined: '',
      birthDate: '',
      gender: '',
      weight: 0,
      caloriesPerKg: 0,
      proteinGramsPerKg: 0,
      fatCalorieProportion: 0,
      error: '',
      success: '',
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
    const user = (await axios.get('/user/')).data;
    const nutrition = (await axios.get('/nutrition/')).data;
    const measurement = (await axios.get('/measurement/weight/')).data;
    this.setState({
      firstname: user.name.first,
      middlename: user.name.middle,
      lastname: user.name.last,
      email: user.email,
      dateJoined: this.formatDate(new Date(user.dateJoined)),
      birthDate: this.formatDate(new Date(user.birthDate)),
      gender: user.gender,
      weight: measurement.weight,
      caloriesPerKg: nutrition.caloriesPerKg,
      proteinGramsPerKg: nutrition.proteinGramsPerKg,
      fatCalorieProportion: nutrition.fatCalorieProportion,
      calorieOffset: nutrition.calorieOffset,
      currentCalorieOffset: nutrition.calorieOffset,
      calorieMode:
        nutrition.calorieOffset > 0
          ? 'bulk'
          : nutrition.calorieOffset < 0
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
    const userResponse = await axios.post('/user/', {
      name: {
        first: this.state.firstname,
        middle: this.state.middlename,
        last: this.state.lastname,
      },
      email: this.state.email,
      birthDate: this.state.birthDate,
      gender: this.state.gender,
    });
    if (userResponse.status !== 200)
      return this.setState({ error: userResponse.data.error });
    const nutritionResponse = await axios.post('/nutrition/', {
      calorieOffset: this.state.calorieOffset,
      caloriesPerKg: this.state.caloriesPerKg,
      proteinGramsPerKg: this.state.proteinGramsPerKg,
      fatCalorieProportion: this.state.fatCalorieProportion,
    });
    if (nutritionResponse.status !== 200)
      return this.setState({ error: nutritionResponse.data.error });
    this.setState({ success: 'Success!' });
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });
  onSelectChange = (evt) => this.setState({ [evt.name]: evt.value });

  render() {
    return (
      <div>
        <Success
          text={this.state.success}
          dismiss={() => this.setState({ success: '' })}
        />
        <Error
          text={this.state.error}
          dismiss={() => this.setState({ error: '' })}
        />
        <Section label="General">
          <Row columns={3}>
            <Text
              name="firstname"
              label="First Name"
              value={this.state.firstname}
              onChange={this.onChange}
            />
            <Text
              name="middlename"
              label="Middle Name(s)"
              value={this.state.middlename}
              onChange={this.onChange}
            />
            <Text
              name="lastname"
              label="Last Name"
              value={this.state.lastname}
              onChange={this.onChange}
            />
          </Row>
          <Text
            name="email"
            label="Email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <Row columns={2}>
            <Select
              name="gender"
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              value={this.state.gender}
              onChange={this.onSelectChange}
              label="Gender"
            />
            <DateInput
              name="birthDate"
              value={this.state.birthDate}
              label="Birth Date"
              onChange={this.onChange}
            />
          </Row>
          <DateInput
            value={this.state.dateJoined}
            label="Date Joined"
            readOnly
          />
        </Section>
        <Section label="Nutrient Information">
          <Row columns={this.state.calorieOffset !== 0 ? 3 : 2}>
            <Calories
              value={this.state.caloriesPerKg * this.state.weight}
              label="Maintenance Calories"
              unit="kcal"
              readOnly
            />
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
            {this.state.calorieOffset !== 0 && (
              <Calories
                name="calorieOffset"
                label="Calorie Offset"
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
        </Section>
        <Row>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Row>
      </div>
    );
  }
}

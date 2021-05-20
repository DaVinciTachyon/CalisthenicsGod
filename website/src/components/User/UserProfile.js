import React from 'react';
import { Row, Column } from '../../style/table';
import { Button } from '../../style/buttons';
import { Number, Calories, Text, Date as DateInput } from '../../style/inputs';
import { Select } from '../../style/inputs';

export default class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      calorieOffset: 0,
      currentOffset: 0,
      calorieMode: 'maintenance',
      name: '',
      email: '',
      dateJoined: '',
      birthDate: '',
      gender: '',
      maintenanceCalories: 0,
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

  setMaintenanceCalories = () =>
    this.setState({
      maintenanceCalories: this.state.caloriesPerKg * this.state.weight,
    });

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/user/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
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
        });
        this.setMaintenanceCalories();
        if (data.calorieOffset > 0)
          this.setState({
            calorieOffset: data.calorieOffset,
            currentOffset: data.calorieOffset,
            calorieMode: 'bulk',
          });
        else if (data.calorieOffset < 0)
          this.setState({
            calorieOffset: -1 * data.calorieOffset,
            currentOffset: data.calorieOffset,
            calorieMode: 'deficit',
          });
      });
  }

  calorieModeChange = (evt) => {
    this.setState({ calorieMode: evt.value });
    if (evt.value === 'deficit')
      this.setState({
        calorieOffset:
          this.state.currentOffset < 0 ? -1 * this.state.currentOffset : 300,
      });
    else if (evt.value === 'bulk')
      this.setState({
        calorieOffset:
          this.state.currentOffset > 0 ? this.state.currentOffset : 200,
      });
    else this.setState({ calorieOffset: 0 });
  };

  editProfile = (evt) => {
    evt.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/nutrition/calorieOffset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        calorieOffset:
          this.state.calorieMode === 'deficit'
            ? -1 * this.state.calorieOffset
            : this.state.calorieOffset,
      }),
    }).then(() => {
      this.setState({
        currentOffset:
          this.state.calorieMode === 'deficit'
            ? -1 * this.state.calorieOffset
            : this.state.calorieOffset,
      });
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Column>
            <Text label="First Name" value={this.state.name.first} readOnly />
          </Column>
        </Row>
        <Row>
          <Column>
            <Text label="Middle Name" value={this.state.name.middle} readOnly />
          </Column>
        </Row>
        <Row>
          <Column>
            <Text label="Last Name" value={this.state.name.last} readOnly />
          </Column>
        </Row>
        <Row>
          <Column>
            <Text label="Email" value={this.state.email} readOnly />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Calorie Mode</Column>
          <Column columns={2}>
            <Column span={this.state.calorieOffset === 0 ? 2 : 1}>
              <Select
                id="calorieMode"
                options={[
                  { label: 'Maintenance', value: 'maintenance' },
                  { label: 'Deficit', value: 'deficit' },
                  { label: 'Bulk', value: 'bulk' },
                ]}
                defaultValue={
                  this.state.currentOffset === 0
                    ? 'maintenance'
                    : this.state.currentOffset > 0
                    ? 'bulk'
                    : 'deficit'
                }
                onChange={this.calorieModeChange}
              />
            </Column>
            {this.state.calorieOffset !== 0 && (
              <Column>
                <Calories
                  value={this.state.calorieOffset}
                  onChange={this.calorieOffsetChange}
                />
              </Column>
            )}
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Maintenance Calories</Column>
          <Column>
            <Calories value={this.state.maintenanceCalories} readOnly />
            <div className="unit-col">kcal</div>
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Calories Per Kilogram of Bodyweight</Column>
          <Column>
            <Calories value={this.state.caloriesPerKg} readOnly />
            <div className="unit-col">kcal</div>
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Protein Amount</Column>
          <Column>
            <Number
              min="0"
              step="0.05"
              value={this.state.proteinGramsPerKg}
              readOnly
            />
            <div className="unit-col">g/kg</div>
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Fat Partition</Column>
          <Column>
            <Number
              min="0"
              value={this.state.fatCalorieProportion * 100}
              readOnly
            />
            <div className="unit-col">%</div>
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Gender</Column>
          <Column>
            <Select
              id="gender"
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              defaultValue={this.state.gender}
              onChange={(evt) => this.setState({ gender: evt.value })}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Birth Date</Column>
          <Column>
            <DateInput value={this.state.birthDate} readOnly />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Date Joined</Column>
          <Column>
            <DateInput value={this.state.dateJoined} readOnly />
          </Column>
        </Row>
        <Row columns={2}>
          <Column span={2}>
            <Button onClick={this.editProfile}>Edit Profile</Button>
          </Column>
        </Row>
      </div>
    );
  }

  calorieOffsetChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.calorieOffset;
    this.setState({ calorieOffset: input });
  };
}

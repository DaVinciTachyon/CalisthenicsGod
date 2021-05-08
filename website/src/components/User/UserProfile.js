import React from 'react';
import { Row, Column } from '../../style/table';
import { Button } from '../../style/buttons';
import { Number, Calories, Text, Date } from '../../style/inputs';

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
      proteinAmount: 0,
      fatPartition: 0,
    };
  }

  editProfile = () => {
    this.setState({ update: !this.state.update });
  };

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
        let dateJoined = new Date(data.dateJoined);
        let birthDate = new Date(data.birthDate);
        this.setState({
          name: data.name,
          email: data.email,
          dateJoined: `${dateJoined
            .getFullYear()
            .toString()
            .padStart(4, '0')}-${(dateJoined.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${dateJoined
            .getDate()
            .toString()
            .padStart(2, '0')}`,
          birthDate: `${birthDate.getFullYear().toString().padStart(4, '0')}-${(
            birthDate.getMonth() + 1
          )
            .toString()
            .padStart(2, '0')}-${birthDate
            .getDate()
            .toString()
            .padStart(2, '0')}`,
          gender: data.gender,
          maintenanceCalories: data.maintenanceCalories,
          proteinAmount: data.proteinAmount,
          fatPartition: data.fatPartition,
        });
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
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.calorieMode;
    this.setState({ calorieMode: input });
    if (this.state.currentOffset < 0 && input === 'deficit')
      this.setState({ calorieOffset: -1 * this.state.currentOffset });
    else if (input === 'deficit') this.setState({ calorieOffset: 300 });
    else if (this.state.currentOffset > 0 && input === 'bulk')
      this.setState({ calorieOffset: this.state.currentOffset });
    else if (input === 'bulk') this.setState({ calorieOffset: 200 });
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
        <Row columns={2}>
          <Column>First Name</Column>
          <Column>
            <Text value={this.state.name.first} readOnly />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Middle Name</Column>
          <Column>
            <Text
              placeholder="Middle Name"
              value={this.state.name.middle}
              readOnly
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Last Name</Column>
          <Column>
            <Text value={this.state.name.last} readOnly />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Email</Column>
          <Column>
            <Text value={this.state.email} readOnly />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Calorie Mode</Column>
          <Column>
            <select id="calorieMode" onChange={this.calorieModeChange}>
              <option
                value="maintenance"
                selected={this.state.currentOffset === 0}
              >
                Maintenance
              </option>
              <option value="deficit" selected={this.state.currentOffset < 0}>
                Deficit
              </option>
              <option value="bulk" selected={this.state.currentOffset > 0}>
                Bulk
              </option>
            </select>
            {this.state.calorieOffset !== 0 && (
              <Calories
                value={this.state.calorieOffset}
                onChange={this.calorieOffsetChange}
              />
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
          <Column>Calorie Offset</Column>
          <Column>
            <Calories value={this.state.currentOffset} readOnly />
            <div className="unit-col">kcal</div>
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Protein Amount</Column>
          <Column>
            <Number
              min="0"
              step="0.05"
              value={this.state.proteinAmount}
              readOnly
            />
            <div className="unit-col">g/kg</div>
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Fat Partition</Column>
          <Column>
            <Number min="0" value={this.state.fatPartition * 100} readOnly />
            <div className="unit-col">%</div>
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Gender</Column>
          <Column>
            <select id="gender">
              <option value="male" selected={this.state.gender === 'male'}>
                Male
              </option>
              <option value="female" selected={this.state.gender === 'female'}>
                Female
              </option>
            </select>
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Birth Date</Column>
          <Column>
            <Date value={this.state.birthDate} readOnly />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Date Joined</Column>
          <Column>
            <Date value={this.state.dateJoined} readOnly />
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

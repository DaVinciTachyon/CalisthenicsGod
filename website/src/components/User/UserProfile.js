import React from 'react';
import './Main.css';

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
    if (!localStorage.getItem('authToken')) window.location = '/login';
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    };
    fetch(`${window.env.API_URL}/user/`, requestOptions)
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
    fetch(`${window.env.API_URL}/nutrition/calorieOffset`, {
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
      <div className="page">
        <form className="profile-table" onSubmit={this.editProfile}>
          <div className="row">
            <div className="label-col col">First Name</div>
            <div className="value-col col">
              <input
                type="text"
                value={this.state.name.first}
                className="readOnly"
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Middle Name</div>
            <div className="value-col col">
              <input
                type="text"
                placeholder="Middle Name"
                value={this.state.name.middle}
                className="readOnly"
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Last Name</div>
            <div className="value-col col">
              <input
                type="text"
                value={this.state.name.last}
                className="readOnly"
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Email</div>
            <div className="value-col col">
              <input
                type="text"
                value={this.state.email}
                className="readOnly"
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Calorie Mode</div>
            <div className="value-col col">
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
                <input
                  type="number"
                  value={this.state.calorieOffset}
                  min="0"
                  step="1"
                  onChange={this.calorieOffsetChange}
                />
              )}
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Maintenance Calories</div>
            <div className="value-col col">
              <input
                type="number"
                min="0"
                value={this.state.maintenanceCalories}
                className="readOnly"
                readOnly
              />
              <div className="unit-col">kcal</div>
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Calorie Offset</div>
            <div className="value-col col">
              <input
                type="number"
                step="1"
                value={this.state.currentOffset}
                className="readOnly"
                readOnly
              />
              <div className="unit-col">kcal</div>
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Protein Amount</div>
            <div className="value-col col">
              <input
                type="number"
                min="0"
                step="0.05"
                value={this.state.proteinAmount}
                className="readOnly"
                readOnly
              />
              <div className="unit-col">g/kg</div>
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Fat Partition</div>
            <div className="value-col col">
              <input
                type="number"
                min="0"
                value={this.state.fatPartition * 100}
                className="readOnly"
                readOnly
              />
              <div className="unit-col">%</div>
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Gender</div>
            <div className="value-col col">
              <select id="gender">
                <option value="male" selected={this.state.gender === 'male'}>
                  Male
                </option>
                <option
                  value="female"
                  selected={this.state.gender === 'female'}
                >
                  Female
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Birth Date</div>
            <div className="value-col col">
              <input
                type="date"
                value={this.state.birthDate}
                className="readOnly"
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="label-col col">Date Joined</div>
            <div className="value-col col">
              <input
                type="date"
                value={this.state.dateJoined}
                className="readOnly"
                readOnly
              />
            </div>
          </div>
          <div className="row">
            <div className="submit-col col">
              <input
                className="submitButton button"
                type="submit"
                value="Edit Profile"
              />
            </div>
          </div>
        </form>
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

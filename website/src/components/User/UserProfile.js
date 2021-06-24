import React from 'react'
import { Row, Section } from '../../style/table'
import { Button } from '../../style/buttons'
import {
  Calories,
  Text,
  Date as DateInput,
  Number,
  Select,
  Range,
} from '../../style/inputs'
import { connect } from 'react-redux'
import { getMeasurementHistory } from '../../stateManagement/reducers/measurements'
import {
  getUserInfo,
  modifyUserInfo,
  getNutritionInfo,
  modifyNutritionInfo,
} from '../../stateManagement/reducers/user'
import { getWeight } from '../util'

class UserProfile extends React.Component {
  constructor() {
    super()
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
      caloriesPerKg: 0,
      proteinGramsPerKg: 0,
      fatCalorieProportion: 0,
    }
  }

  componentDidMount() {
    this.props.getUserInfo()
    this.props.getNutritionInfo()
    this.props.getMeasurementHistory('weight')
    this.getUserInfo()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) this.getUserInfo()
  }

  formatDate = (date) =>
    `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

  getUserInfo = () => {
    const { user } = this.props

    this.setState({
      firstname: user.name?.first,
      middlename: user.name?.middle,
      lastname: user.name?.last,
      email: user.email,
      dateJoined: this.formatDate(new Date(user.dateJoined)),
      birthDate: this.formatDate(new Date(user.birthDate)),
      gender: user.gender,
      caloriesPerKg: user.nutrition?.caloriesPerKg,
      proteinGramsPerKg: user.nutrition?.proteinGramsPerKg,
      fatCalorieProportion: user.nutrition?.fatCalorieProportion,
      calorieOffset: user.nutrition?.calorieOffset,
      currentCalorieOffset: user.nutrition?.calorieOffset,
      calorieMode:
        user.nutrition?.calorieOffset > 1
          ? 'bulk'
          : user.nutrition?.calorieOffset < 1
          ? 'deficit'
          : 'maintenance',
    })
  }

  onCalorieModeChange = (evt) => {
    this.onChange(evt)
    this.setState({
      calorieOffset:
        evt.value === 'deficit'
          ? this.state.currentCalorieOffset < 1
            ? this.state.currentCalorieOffset
            : 0.85
          : evt.value === 'bulk'
          ? this.state.currentCalorieOffset > 1
            ? this.state.currentCalorieOffset
            : 1.05
          : 1,
    })
  }

  onSubmit = async () => {
    this.props.modifyUserInfo({
      name: {
        first: this.state.firstname,
        middle: this.state.middlename,
        last: this.state.lastname,
      },
      email: this.state.email,
      birthDate: this.state.birthDate,
      gender: this.state.gender,
    })
    this.props.modifyNutritionInfo({
      calorieOffset: this.state.calorieOffset,
      caloriesPerKg: this.state.caloriesPerKg,
      proteinGramsPerKg: this.state.proteinGramsPerKg,
      fatCalorieProportion: this.state.fatCalorieProportion,
    })
  }

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value })

  render() {
    const maintenanceCalories =
      this.state.caloriesPerKg * getWeight(this.props.measurements.weight)
    return (
      <div>
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
              onChange={this.onChange}
              label="Gender"
            />
            <DateInput
              name="birthDate"
              value={this.state.birthDate}
              label="Date of Birth"
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
          <Row columns={this.state.calorieOffset !== 1 ? 4 : 2}>
            <Calories
              value={maintenanceCalories}
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
            {this.state.calorieOffset !== 1 && (
              <>
                <Number
                  name="calorieOffset"
                  label="Offset Percentage"
                  value={
                    (this.state.calorieOffset - 1) *
                    (this.state.calorieMode === 'deficit' ? -100 : 100)
                  }
                  onChange={(evt) => {
                    evt.target.value /=
                      this.state.calorieMode === 'deficit' ? -100 : 100
                    evt.target.value++
                    this.onChange(evt)
                  }}
                  unit="%"
                  min={0}
                  max={100}
                />
                <Calories
                  label="Calorie Offset"
                  value={
                    this.state.calorieOffset * maintenanceCalories -
                    maintenanceCalories
                  }
                  readOnly
                />
              </>
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
    )
  }
}

export default connect(({ measurements, user }) => ({ measurements, user }), {
  getMeasurementHistory,
  getUserInfo,
  modifyUserInfo,
  getNutritionInfo,
  modifyNutritionInfo,
})(UserProfile)

import React from 'react';
import { Row, Column } from '../../style/table';
import { Button, SuccessButton, ErrorButton } from '../../style/buttons';
import {
  Text,
  Number,
  Weight,
  Fat,
  Carbohydrate,
  Protein,
  Ethanol,
} from '../../style/inputs';
import { Select } from '../../style/inputs';

export default class IngredientRow extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      name: '',
      fat: 0,
      carb: 0,
      prot: 0,
      eth: 0,
      name_og: '',
      fat_og: 0,
      carb_og: 0,
      prot_og: 0,
      eth_og: 0,
      ingredients: [],
      standardWeight: 100,
      isNew: true,
    };
  }

  componentDidMount() {
    if (!this.props.isNew && this.props.isSummary) {
      if (this.props.hasWeight)
        this.setState({
          weight: Math.round(this.props.ingredient.weight * 10) / 10,
        });
      this.setState({
        name: this.props.ingredient.name,
        name_og: this.props.ingredient.name,
        fat_og: this.props.ingredient.fat,
        carb_og: this.props.ingredient.carbohydrate,
        prot_og: this.props.ingredient.protein,
        eth_og: this.props.ingredient.ethanol,
        fat: Math.round(this.props.ingredient.fat * 10) / 10,
        carb: Math.round(this.props.ingredient.carbohydrate * 10) / 10,
        prot: Math.round(this.props.ingredient.protein * 10) / 10,
        eth: Math.round(this.props.ingredient.ethanol * 10) / 10,
      });
    } else if (!this.props.isNew) {
      if (this.props.hasWeight) {
        this.setState({
          weight: this.props.ingredient.weight,
          weight_og: this.props.ingredient.weight,
          fat_base: this.props.ingredient.fat,
          carb_base: this.props.ingredient.carbohydrate,
          prot_base: this.props.ingredient.protein,
          eth_base: this.props.ingredient.ethanol,
          fat:
            Math.round(
              ((this.props.ingredient.fat * this.props.ingredient.weight) /
                100) *
                10
            ) / 10,
          carb:
            Math.round(
              ((this.props.ingredient.carbohydrate *
                this.props.ingredient.weight) /
                100) *
                10
            ) / 10,
          prot:
            Math.round(
              ((this.props.ingredient.protein * this.props.ingredient.weight) /
                100) *
                10
            ) / 10,
          eth:
            Math.round(
              ((this.props.ingredient.ethanol * this.props.ingredient.weight) /
                100) *
                10
            ) / 10,
        });
      } else {
        this.setState({
          fat: Math.round(this.props.ingredient.fat * 10) / 10,
          carb: Math.round(this.props.ingredient.carbohydrate * 10) / 10,
          prot: Math.round(this.props.ingredient.protein * 10) / 10,
          eth: Math.round(this.props.ingredient.ethanol * 10) / 10,
        });
      }
      this.setState({
        name: this.props.ingredient.name,
        name_og: this.props.ingredient.name,
        fat_og: this.props.ingredient.fat,
        carb_og: this.props.ingredient.carbohydrate,
        prot_og: this.props.ingredient.protein,
        eth_og: this.props.ingredient.ethanol,
      });
    } else if (this.props.hasWeight) {
      this.setState({
        weight_og: 0,
        weight: 0,
        fat_base: 0,
        carb_base: 0,
        prot_base: 0,
        eth_base: 0,
        ingredient: '',
      });
      this.getIngredients();
    }
    if (this.props.noToggle)
      this.setState({
        edit: true,
      });
  }

  ingredientChange = (evt) => {
    if (evt.value === '')
      this.setState({
        name: '',
        fat_base: 0,
        carb_base: 0,
        prot_base: 0,
        eth_base: 0,
        isNew: true,
      });
    else {
      const ingredient = this.state.ingredients.find(
        (val) => val._id === evt.value
      );
      this.setState({
        name: ingredient.name,
        fat_base: ingredient.fat,
        carb_base: ingredient.carbohydrate,
        prot_base: ingredient.protein,
        eth_base: ingredient.ethanol,
        isNew: false,
      });
    }
    this.setState({
      ingredient: evt.value,
      weight: 0,
      fat: 0,
      carb: 0,
      prot: 0,
      eth: 0,
    });
  };

  getIngredients = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/ingredients/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        let ingredients = Object.assign({}, this.state.ingredients);
        ingredients = data.ingredients;
        this.setState({ ingredients: ingredients });
      });
  };

  reset = () => {
    if ((this.props.ingredient || this.props.isNew) && this.props.hasWeight)
      this.setState({
        weight: this.state.weight_og,
      });
    else
      this.setState({
        name: this.state.name_og,
        fat: this.state.fat_og,
        carb: this.state.carb_og,
        prot: this.state.prot_og,
        eth: this.state.eth_og,
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.focus !== this.props.focus && this.state.edit) {
      this.stopEdit();
      if (!this.props.isNew) this.submit();
    }
    if (
      this.props.isSummary &&
      JSON.stringify(prevProps.ingredient) !==
        JSON.stringify(this.props.ingredient)
    ) {
      this.setState({
        weight: Math.round(this.props.ingredient.weight * 10) / 10,
        fat: Math.round(this.props.ingredient.fat * 10) / 10,
        carb: Math.round(this.props.ingredient.carbohydrate * 10) / 10,
        prot: Math.round(this.props.ingredient.protein * 10) / 10,
        eth: Math.round(this.props.ingredient.ethanol * 10) / 10,
      });
    }
  }

  stopEdit = () => {
    this.setState({ edit: false });
  };

  changeFocus = async () => {
    await this.props.changeFocus();
    this.setState({ edit: true });
  };

  submitStatus = () => {
    this.props.submitStatus({
      _id: this.props.ingredient._id,
      mealId: this.props.mealId,
    });
  };

  submit = () => {
    let ingredient = {};
    if (this.props.isNew && this.props.hasWeight) {
      if (this.state.isNew) {
        ingredient = {
          name: this.state.name,
          fat: parseFloat(this.state.fat_base),
          carb: parseFloat(this.state.carb_base),
          prot: parseFloat(this.state.prot_base),
          eth: parseFloat(this.state.eth_base),
        };
      } else {
        ingredient = {
          _id: this.state.ingredient,
          name: this.state.name,
          fat: parseFloat(this.state.fat_base),
          carb: parseFloat(this.state.carb_base),
          prot: parseFloat(this.state.prot_base),
          eth: parseFloat(this.state.eth_base),
        };
      }
      ingredient.mealId = this.props.mealId;
      ingredient.weight = parseFloat(this.state.weight);
    } else {
      ingredient = {
        name: this.state.name,
        weight: parseFloat(this.state.weight),
        fat: parseFloat(this.state.fat),
        carb: parseFloat(this.state.carb),
        prot: parseFloat(this.state.prot),
        eth: parseFloat(this.state.eth),
      };
      if (!this.props.isNew) ingredient._id = this.props.ingredient._id;
    }
    if (this.props.mealId) ingredient.mealId = this.props.mealId;

    if (this.state.name === '')
      this.setState({
        name: this.state.name_og,
        weight: this.state.weight_og,
        fat: this.state.fat_og,
        carb: this.state.carb_og,
        prot: this.state.prot_og,
        eth: this.state.eth_og,
      });
    else {
      this.props.onSubmit(ingredient);
      if (this.props.isNewMeal)
        this.setState({
          name: this.state.name_og,
          weight: this.state.weight_og,
          fat: this.state.fat_og,
          carb: this.state.carb_og,
          prot: this.state.prot_og,
          eth: this.state.eth_og,
          fat_base: this.state.fat_og,
          carb_base: this.state.carb_og,
          prot_base: this.state.prot_og,
          eth_base: this.state.eth_og,
        });
      else
        this.setState({
          name_og: this.state.name,
          weight_og: this.state.weight,
          fat_og: this.state.fat,
          carb_og: this.state.carb,
          prot_og: this.state.prot,
          eth_og: this.state.eth,
        });
    }
    this.stopEdit();
    if (this.props.cancel) this.props.cancel();
  };

  cancel = () => {
    this.reset();
    this.stopEdit();
    if (this.props.cancel) this.props.cancel();
  };

  nameChange = (evt) => {
    this.setState({ name: evt.target.value });
  };

  weightChange = (evt) => {
    let input = evt.target.validity.valid
      ? evt.target.value
      : this.state.weight;
    this.setState({
      weight: input,
      fat: Math.round(((this.state.fat_base * input) / 100) * 10) / 10,
      carb: Math.round(((this.state.carb_base * input) / 100) * 10) / 10,
      prot: Math.round(((this.state.prot_base * input) / 100) * 10) / 10,
      eth: Math.round(((this.state.eth_base * input) / 100) * 10) / 10,
    });
  };

  fatChange = (evt) => {
    let input = evt.target.validity.valid ? evt.target.value : this.state.fat;
    this.setState({ fat: input });
  };

  fatBaseChange = (evt) => {
    let input = evt.target.validity.valid
      ? evt.target.value
      : this.state.fat_base;
    this.setState({
      fat_base: input,
      fat: Math.round(((input * this.state.weight) / 100) * 10) / 10,
    });
  };

  carbChange = (evt) => {
    let input = evt.target.validity.valid ? evt.target.value : this.state.carb;
    this.setState({ carb: input });
  };

  carbBaseChange = (evt) => {
    let input = evt.target.validity.valid
      ? evt.target.value
      : this.state.carb_base;
    this.setState({
      carb_base: input,
      carb: Math.round(((input * this.state.weight) / 100) * 10) / 10,
    });
  };

  protChange = (evt) => {
    let input = evt.target.validity.valid ? evt.target.value : this.state.prot;
    this.setState({ prot: input });
  };

  protBaseChange = (evt) => {
    let input = evt.target.validity.valid
      ? evt.target.value
      : this.state.prot_base;
    this.setState({
      prot_base: input,
      prot: Math.round(((input * this.state.weight) / 100) * 10) / 10,
    });
  };

  ethChange = (evt) => {
    let input = evt.target.validity.valid ? evt.target.value : this.state.eth;
    this.setState({ eth: input });
  };

  ethBaseChange = (evt) => {
    let input = evt.target.validity.valid
      ? evt.target.value
      : this.state.eth_base;
    this.setState({
      eth_base: input,
      eth: Math.round(((input * this.state.weight) / 100) * 10) / 10,
    });
  };

  getCalories = () => {
    return Math.round(
      this.state.fat * 9 +
        this.state.carb * 4 +
        this.state.prot * 4 +
        this.state.eth * 7
    );
  };

  render() {
    if (!this.props.noToggle && this.props.isNew && !this.state.edit) {
      return (
        <Row columns={9}>
          <Column span={9}>
            <Button onClick={this.changeFocus}>+</Button>
          </Column>
        </Row>
      );
    }

    let ingredients = [{ label: 'New', value: '' }];
    if (this.props.isNew && this.props.hasWeight)
      this.state.ingredients.forEach((ingredient) =>
        ingredients.push({ value: ingredient._id, label: ingredient.name })
      );
    return (
      <Row
        columns={this.props.isSummary ? (this.props.hasWeight ? 8 : 7) : 9}
        className={
          this.props.isSummary
            ? 'emphasis'
            : this.props.isNew && this.state.edit
            ? 'input'
            : ''
        }
      >
        <Column span={2}>
          {this.props.isNew && this.props.hasWeight && (
            <Select
              options={ingredients}
              defaultValue={this.state.ingredient}
              onChange={this.ingredientChange}
            />
          )}
          {(this.props.isNew || this.state.isNew) && (
            <Text
              name="name"
              value={this.state.name}
              onChange={this.nameChange}
              required
              readOnly={
                !this.state.edit ||
                (this.props.hasWeight && !this.props.isNew) ||
                this.props.isSummary
              }
              onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
            />
          )}
        </Column>
        <Column>
          <Number
            name="calories"
            min="0"
            step="1"
            value={this.getCalories()}
            readOnly
            onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
          />
        </Column>
        {this.props.hasWeight && (
          <Column>
            <Weight
              name="weight"
              value={this.state.weight}
              onChange={this.weightChange}
              readOnly={!this.state.edit || this.props.isSummary}
              onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
            />
            {this.props.isNew && this.props.hasWeight && (
              <Weight
                name="weight"
                value={this.state.standardWeight}
                // onChange={this.weightChange}
                // readOnly={!this.state.edit}
                onDoubleClick={this.changeFocus}
              />
            )}
          </Column>
        )}
        <Column>
          <Fat
            name="fat"
            max={this.props.isNew && this.props.hasWeight ? '' : '100'}
            value={this.state.fat}
            onChange={this.fatChange}
            readOnly={
              !this.state.edit || this.props.hasWeight || this.props.isSummary
            }
            onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
          />
          {this.props.isNew && this.props.hasWeight && (
            <Fat
              name="fat_base"
              max="100"
              value={this.state.fat_base}
              onChange={this.fatBaseChange}
              readOnly={
                !this.state.edit ||
                !this.state.isNew ||
                !(
                  this.props.isNew &&
                  this.props.hasWeight &&
                  this.state.ingredient === ''
                ) ||
                this.props.isSummary
              }
              onDoubleClick={this.changeFocus}
            />
          )}
        </Column>
        <Column>
          <Carbohydrate
            name="carb"
            max={this.props.isNew && this.props.hasWeight ? '' : '100'}
            value={this.state.carb}
            onChange={this.carbChange}
            readOnly={
              !this.state.edit || this.props.hasWeight || this.props.isSummary
            }
            onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
          />
          {this.props.isNew && this.props.hasWeight && (
            <Carbohydrate
              name="carb_base"
              max="100"
              value={this.state.carb_base}
              onChange={this.carbBaseChange}
              readOnly={
                !this.state.edit ||
                !this.state.isNew ||
                !(
                  this.props.isNew &&
                  this.props.hasWeight &&
                  this.state.ingredient === ''
                ) ||
                this.props.isSummary
              }
              onDoubleClick={this.changeFocus}
            />
          )}
        </Column>
        <Column>
          <Protein
            name="prot"
            max={this.props.isNew && this.props.hasWeight ? '' : '100'}
            value={this.state.prot}
            onChange={this.protChange}
            readOnly={
              !this.state.edit || this.props.hasWeight || this.props.isSummary
            }
            onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
          />
          {this.props.isNew && this.props.hasWeight && (
            <Protein
              name="prot_base"
              max="100"
              value={this.state.prot_base}
              onChange={this.protBaseChange}
              readOnly={
                !this.state.edit ||
                !this.state.isNew ||
                !(
                  this.props.isNew &&
                  this.props.hasWeight &&
                  this.state.ingredient === ''
                ) ||
                this.props.isSummary
              }
              onDoubleClick={this.changeFocus}
            />
          )}
        </Column>
        <Column>
          <Ethanol
            name="eth"
            max={this.props.isNew && this.props.hasWeight ? '' : '100'}
            value={this.state.eth}
            onChange={this.ethChange}
            readOnly={
              !this.state.edit || this.props.hasWeight || this.props.isSummary
            }
            onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
          />
          {this.props.isNew && this.props.hasWeight && (
            <Ethanol
              name="eth_base"
              max="100"
              value={this.state.eth_base}
              onChange={this.ethBaseChange}
              readOnly={
                !this.state.edit ||
                !this.state.isNew ||
                !(
                  this.props.isNew &&
                  this.props.hasWeight &&
                  this.state.ingredient === ''
                ) ||
                this.props.isSummary
              }
              onDoubleClick={this.changeFocus}
            />
          )}
        </Column>
        {!this.props.isSummary && !this.state.edit && !this.props.isNew && (
          <Column>
            {this.props.isUnavailable && (
              <SuccessButton onClick={this.submitStatus}>+</SuccessButton>
            )}
            {!this.props.isUnavailable && (
              <ErrorButton onClick={this.submitStatus}>×</ErrorButton>
            )}
          </Column>
        )}
        {this.state.edit && (
          <Column>
            <SuccessButton onClick={this.submit}>+</SuccessButton>
            <ErrorButton onClick={this.cancel}>×</ErrorButton>
          </Column>
        )}
      </Row>
    );
  }
}

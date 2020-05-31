import React from "react";
import "./Main.css";

export default class IngredientRow extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      name: "",
      fat: 0,
      carb: 0,
      prot: 0,
      eth: 0,
      name_og: "",
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
        ingredient: "",
      });
      this.getIngredients();
    }
    if (this.props.noToggle)
      this.setState({
        edit: true,
      });
  }

  ingredientChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.ingredient;
    if (input === "")
      this.setState({
        name: "",
        fat_base: 0,
        carb_base: 0,
        prot_base: 0,
        eth_base: 0,
        isNew: true,
      });
    else {
      const ingredient = this.state.ingredients.find(
        (val) => val._id === input
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
      ingredient: input,
      weight: 0,
      fat: 0,
      carb: 0,
      prot: 0,
      eth: 0,
    });
  };

  getIngredients = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };
    fetch("http://localhost:8080/nutrition/ingredients/", requestOptions)
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

    if (this.state.name === "")
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
        <button onClick={this.changeFocus} className="addButton button">
          +
        </button>
      );
    }

    let ingredients = [];
    if (this.props.isNew && this.props.hasWeight) {
      for (let i = 0; i < this.state.ingredients.length; i++) {
        ingredients.push(
          <option
            key={this.state.ingredients[i]._id}
            value={this.state.ingredients[i]._id}
          >
            {this.state.ingredients[i].name}
          </option>
        );
      }
    }
    return (
      <div
        className={
          this.props.isSummary
            ? "lineEmphasis row"
            : this.props.isNew && this.state.edit
            ? "inputLineEmphasis lineEmphasis row"
            : "row"
        }
      >
        <div className="name-col col">
          {this.props.isNew && this.props.hasWeight && (
            <select onChange={this.ingredientChange.bind(this)}>
              <option value="" selected={this.state.ingredient === ""}>
                New
              </option>
              {ingredients}
            </select>
          )}
          {this.state.isNew && (
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.nameChange}
              className={
                "name input" +
                ((this.props.hasWeight && !this.props.isNew) ||
                this.props.isSummary
                  ? " readOnly inheritBackground"
                  : " editable")
              }
              required
              readOnly={
                !this.state.edit ||
                (this.props.hasWeight && !this.props.isNew) ||
                this.props.isSummary
              }
              onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
            />
          )}
        </div>
        <div className="calories-col col">
          <input
            name="calories"
            type="number"
            min="0"
            step="1"
            value={this.getCalories()}
            className="calories readOnly"
            readOnly
            onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
          />
        </div>
        {this.props.hasWeight && (
          <div className="weight-col col">
            <input
              name="weight"
              type="number"
              min="0"
              step="0.1"
              value={this.state.weight}
              onChange={this.weightChange}
              className={
                "weight input" +
                (this.props.isSummary ? " readOnly" : " editable")
              }
              readOnly={!this.state.edit || this.props.isSummary}
              onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
            />
            {this.props.isNew && this.props.hasWeight && (
              <input
                name="weight"
                type="number"
                min="0"
                step="0.1"
                value={this.state.standardWeight}
                // onChange={this.weightChange}
                className="weight readOnly"
                // readOnly={!this.state.edit}
                onDoubleClick={this.changeFocus}
              />
            )}
          </div>
        )}
        <div className="fat-col col">
          <input
            name="fat"
            type="number"
            min="0"
            max={this.props.isNew && this.props.hasWeight ? "" : "100"}
            step="0.1"
            value={this.state.fat}
            onChange={this.fatChange}
            className={
              "fat input" +
              (this.props.hasWeight || this.props.isSummary
                ? " readOnly"
                : " editable")
            }
            readOnly={
              !this.state.edit || this.props.hasWeight || this.props.isSummary
            }
            onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
          />
          {this.props.isNew && this.props.hasWeight && (
            <input
              name="fat_base"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={this.state.fat_base}
              onChange={this.fatBaseChange}
              className={
                "fat input" +
                (!this.state.isNew ||
                !(
                  (this.props.isNew &&
                    this.props.hasWeight &&
                    this.state.ingredient === "") ||
                  this.props.isSummary
                )
                  ? " readOnly"
                  : " editable")
              }
              readOnly={
                !this.state.edit ||
                !this.state.isNew ||
                !(
                  this.props.isNew &&
                  this.props.hasWeight &&
                  this.state.ingredient === ""
                ) ||
                this.props.isSummary
              }
              onDoubleClick={this.changeFocus}
            />
          )}
        </div>
        <div className="carbohydrate-col col">
          <input
            name="carb"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={this.state.carb}
            onChange={this.carbChange}
            className={
              "carbohydrate input" +
              (this.props.hasWeight || this.props.isSummary
                ? " readOnly"
                : " editable")
            }
            readOnly={
              !this.state.edit || this.props.hasWeight || this.props.isSummary
            }
            onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
          />
          {this.props.isNew && this.props.hasWeight && (
            <input
              name="carb_base"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={this.state.carb_base}
              onChange={this.carbBaseChange}
              className={
                "carbohydrate input" +
                (!this.state.isNew ||
                !(
                  (this.props.isNew &&
                    this.props.hasWeight &&
                    this.state.ingredient === "") ||
                  this.props.isSummary
                )
                  ? " readOnly"
                  : " editable")
              }
              readOnly={
                !this.state.edit ||
                !this.state.isNew ||
                !(
                  this.props.isNew &&
                  this.props.hasWeight &&
                  this.state.ingredient === ""
                ) ||
                this.props.isSummary
              }
              onDoubleClick={this.changeFocus}
            />
          )}
        </div>
        <div className="protein-col col">
          <input
            name="prot"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={this.state.prot}
            onChange={this.protChange}
            className={
              "protein input" +
              (this.props.hasWeight || this.props.isSummary
                ? " readOnly"
                : " editable")
            }
            readOnly={
              !this.state.edit || this.props.hasWeight || this.props.isSummary
            }
            onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
          />
          {this.props.isNew && this.props.hasWeight && (
            <input
              name="prot_base"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={this.state.prot_base}
              onChange={this.protBaseChange}
              className={
                "protein input" +
                (!this.state.isNew ||
                !(
                  this.props.isNew &&
                  this.props.hasWeight &&
                  this.state.ingredient === ""
                ) ||
                this.props.isSummary
                  ? " readOnly"
                  : " editable")
              }
              readOnly={
                !this.state.edit ||
                !this.state.isNew ||
                !(
                  this.props.isNew &&
                  this.props.hasWeight &&
                  this.state.ingredient === ""
                ) ||
                this.props.isSummary
              }
              onDoubleClick={this.changeFocus}
            />
          )}
        </div>
        <div className="ethanol-col col">
          <input
            name="eth"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={this.state.eth}
            onChange={this.ethChange}
            className={
              "ethanol input" +
              (this.props.hasWeight || this.props.isSummary
                ? " readOnly"
                : " editable")
            }
            readOnly={
              !this.state.edit || this.props.hasWeight || this.props.isSummary
            }
            onDoubleClick={this.props.isSummary ? () => {} : this.changeFocus}
          />
          {this.props.isNew && this.props.hasWeight && (
            <input
              name="eth_base"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={this.state.eth_base}
              onChange={this.ethBaseChange}
              className={
                "ethanol input" +
                (!this.state.isNew ||
                !(
                  this.props.isNew &&
                  this.props.hasWeight &&
                  this.state.ingredient === ""
                ) ||
                this.props.isSummary
                  ? " readOnly"
                  : " editable")
              }
              readOnly={
                !this.state.edit ||
                !this.state.isNew ||
                !(
                  this.props.isNew &&
                  this.props.hasWeight &&
                  this.state.ingredient === ""
                ) ||
                this.props.isSummary
              }
              onDoubleClick={this.changeFocus}
            />
          )}
        </div>
        {!this.props.isSummary && !this.state.edit && !this.props.isNew && (
          <div className="status-col col">
            {this.props.isUnavailable && (
              <button
                className="successButton button"
                onClick={this.submitStatus}
              >
                +
              </button>
            )}
            {!this.props.isUnavailable && (
              <button
                className="errorButton button"
                onClick={this.submitStatus}
              >
                ×
              </button>
            )}
          </div>
        )}
        {this.state.edit && (
          <div className="status-col col">
            <button className="successButton button" onClick={this.submit}>
              +
            </button>
            <button className="errorButton button" onClick={this.cancel}>
              ×
            </button>
          </div>
        )}
      </div>
    );
  }
}

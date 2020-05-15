import React from 'react';
import '../Main.css';
import IngredientAdder from './IngredientsAdder';
import IngredientList from './IngredientList';

export default class Ingredients extends React.Component {
    constructor() {
        super();
        this.state = {
            fatDark: '#ffd433',
            fatLight: '#ffe582',
            carbDark: '#ff3f3f',
            carbLight: '#ff9999',
            protDark: '#3fafff',
            protLight: '#99f1ff',
            ethDark: '#35ff38',
            ethLight: '#82ff84',
            update: false
        };
    }

    async componentDidMount() {
        if (!localStorage.getItem('authToken')) window.location = '/login';
    }

    addIngredient = () => {
        this.setState({ update: !this.state.update });
    };

    render() {
        return (
            <div style={{ padding: '100px' }}>
                <IngredientAdder
                    fatLight={this.state.fatLight}
                    carbLight={this.state.carbLight}
                    protLight={this.state.protLight}
                    ethLight={this.state.ethLight}
                    addIngredient={this.addIngredient}
                />
                <IngredientList
                    fatLight={this.state.fatLight}
                    carbLight={this.state.carbLight}
                    protLight={this.state.protLight}
                    ethLight={this.state.ethLight}
                    update={this.state.update}
                />
            </div>
        );
    }
}

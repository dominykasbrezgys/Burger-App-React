import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerSummary from '../../components/Burger/BurgerSummary/BurgerSummary';
import axios from '../../axios-firebase';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{

    canBeAdded (ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum,el)=>{
                return sum + el;
            },0);
         return sum > 0;
    }

    addToMenuHandler = () => {
        //POST request
        const burger = {
            burgerName: this.props.burgerNameInput.value,
            ingredients: this.props.ings,
            price: this.props.price
        };
        this.props.onAddToMenu(burger)
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }; 
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let burgerSummary = <BurgerSummary 
            ingredients={this.props.ings} 
            totalPrice = {this.props.price}
            cancel={this.props.onAddingToMenuCancelled}
            continue={this.addToMenuHandler} />;

        if (this.props.loading){
            burgerSummary = <Spinner/>
        }
        return(
            <Aux>
                <Modal show={this.props.adding} modalClosed={this.props.onAddingToMenuCancelled} >
                    {burgerSummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    addIngredient ={this.props.onIngredientAdded}
                    removeIngredient ={this.props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    canBeAdded = {this.canBeAdded(this.props.ings)}
                    addToMenu = {this.props.onAddingToMenuEnabled}
                    price = {this.props.price}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        burgerNameInput: state.burgerBuilder.burgerNameInput,
        adding: state.burgerBuilder.addingToMenu,
        loading: state.burgerBuilder.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onAddingToMenuCancelled: () => dispatch(burgerBuilderActions.cancelAddingToMenu()),
        onAddingToMenuEnabled: () => dispatch(burgerBuilderActions.enableAddingToMenu()),
        onAddToMenu: (burgerData) => dispatch(burgerBuilderActions.addToMenu(burgerData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{
    state = {
        burgerNameInput: {
            value:'',
            isValid: false,
            touched: false
        },
        addingToMenu: false,
        loading: false
    }

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

    addingHandler = () => {
        this.setState({addingToMenu:true});
    }

    addingCancelHandler = () =>{
        const updatedBurgerNameInput = {
            ...this.state.burgerNameInput
        }
        updatedBurgerNameInput.value = '';
        updatedBurgerNameInput.isValid =  false;
        updatedBurgerNameInput.touched = false;

        this.setState({
            addingToMenu: false,
            burgerNameInput: updatedBurgerNameInput
        });
    }

    addToMenuHandler = () => {
        //POST request
        this.setState({loading:true});
        const burger = {
            burgerName: this.state.burgerName,
            ingredients: this.state.ingredients,
            price: this.props.price
        };
        axios.post('/burgers.json',burger)
            .then(response =>{
                this.setState({loading: false, addingToMenu: false});
                this.props.history.push('/menu');
            })
            .catch(error => this.setState({loading: false, addingToMenu: false}) );
    }

    nameChangedHandler = (event) =>{
        const newBurgerName = event.target.value;
        const updatedBurgerNameInput = {
            ...this.state.burgerNameInput
        }
        updatedBurgerNameInput.value = newBurgerName;
        updatedBurgerNameInput.isValid =  newBurgerName.trim() !== '';
        updatedBurgerNameInput.touched = true;

        this.setState({burgerNameInput: updatedBurgerNameInput });
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
            burgerNameHandler ={this.nameChangedHandler}
            cancel={this.addingCancelHandler}
            continue={this.addToMenuHandler}
            nameInput ={this.state.burgerNameInput}/>;

        if (this.state.loading){
            burgerSummary = <Spinner/>
        }

        return(
            <Aux>
                <Modal show={this.state.addingToMenu} modalClosed={this.addingCancelHandler} >
                    {burgerSummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    addIngredient ={this.props.onIngredientAdded}
                    removeIngredient ={this.props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    canBeAdded = {this.canBeAdded(this.props.ings)}
                    addToMenu = {this.addingHandler}
                    price = {this.props.price}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
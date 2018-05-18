import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-firebase';
import Spinner from '../../components/UI/Spinner/Spinner';
import networkErrorHandler from '../../hoc/networkErrorHandler/networkErrorHandler';
//import classes from './BurgerBuilder.css'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    breadMiddle: 0.1,
    meat: 1.3,
    cheese:0.4
};

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            breadMiddle: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 4,
        burgerName: '',
        canBeAdded: false,
        addingToMenu: false,
        loading: false
    }

    updateAddingToMenuState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum,el)=>{
                return sum + el;
            },0);
        this.setState({canBeAdded: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        //State must be changed in an immutable way
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice +INGREDIENT_PRICES[type];

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updateAddingToMenuState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount !== 0){
            const updatedCount = oldCount-1;
            //State must be changed in an immutable way
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
    
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - INGREDIENT_PRICES[type];
    
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updateAddingToMenuState(updatedIngredients);
        }
    }

    addingHandler = () => {
        this.setState({addingToMenu:true});
    }

    addingCancelHandler = () =>{
        this.setState({addingToMenu:false});
    }

    addToMenuHandler = () => {
        //POST request
        this.setState({loading:true});
        const burger = {
            burgerName: this.state.burgerName,
            ingredients: this.state.ingredients
        };
        axios.post('/burgers.json',burger)
            .then(response =>{
                this.setState({loading: false, addingToMenu: false});
            })
            .catch(error => this.setState({loading: false, addingToMenu: false}) );
    }

    nameChangedHandler = (event) =>{
        const newBurgerName = event.target.value;
        this.setState({burgerName: newBurgerName });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }; 
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            totalPrice = {this.state.totalPrice}
            burgerNameHandler ={this.nameChangedHandler}
            cancel={this.addingCancelHandler}
            continue={this.addToMenuHandler}/>;

        if (this.state.loading){
            orderSummary = <Spinner/>
        }

        return(
            <Aux>
                <Modal show={this.state.addingToMenu} modalClosed={this.addingCancelHandler} >
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient ={this.addIngredientHandler}
                    removeIngredient ={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    canBeAdded = {this.state.canBeAdded}
                    addToMenu = {this.addingHandler}
                    price = {this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default networkErrorHandler(BurgerBuilder, axios);
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
    meat: 1.3,
    cheese:0.4
};

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 4,
        canBeOrdered: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum,el)=>{
                return sum + el;
            },0);
        this.setState({canBeOrdered: sum > 0 });
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
        this.updatePurchaseState(updatedIngredients);
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
            this.updatePurchaseState(updatedIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    addToMenuHandler = () => {
        //POST request
        this.setState({loading:true});
        const burger = {
            ingredients: this.state.ingredients,
        };
        axios.post('/burgers.json',burger)
            .then(response =>{
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => this.setState({loading: false, purchasing: false}) );
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
            cancel={this.purchaseCancelHandler}
            continue={this.addToMenuHandler}/>;

        if (this.state.loading){
            orderSummary = <Spinner/>
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient ={this.addIngredientHandler}
                    removeIngredient ={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.canBeOrdered}
                    purchase = {this.purchaseHandler}
                    price = {this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default networkErrorHandler(BurgerBuilder, axios);
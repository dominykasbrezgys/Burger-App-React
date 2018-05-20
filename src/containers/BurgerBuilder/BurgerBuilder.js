import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerSummary from '../../components/Burger/BurgerSummary/BurgerSummary';
import axios from '../../axios-firebase';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.6,
    breadMiddle: 0.1,
    meat: 1.0,
    cheese:0.5
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
        totalPrice : 2,
        burgerNameInput: {
            value:'',
            isValid: false,
            touched: false
        },
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
            price: this.state.totalPrice
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
            ...this.state.ingredients
        }; 
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let burgerSummary = <BurgerSummary 
            ingredients={this.state.ingredients} 
            totalPrice = {this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
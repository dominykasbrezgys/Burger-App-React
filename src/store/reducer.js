import * as actionTypes from './actions';

const initialState = {
        ingredients: {
            salad: 0,
            bacon: 0,
            breadMiddle: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 2 ,
        burgerNameInput: {
            value:'',
            isValid: false,
            touched: false
        },
        addingToMenu: false
}

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.6,
    breadMiddle: 0.1,
    meat: 1.0,
    cheese:0.5
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.CHANGE_BURGER_NAME:
            return {
                ...state,
                burgerNameInput : {
                    value: action.newName,
                    isValid :  action.newName.trim() !== '',
                    touched: true
                }
            };
        case actionTypes.CANCEL_ADDING_TO_MENU:
            return {
                ...state,
                burgerNameInput : {
                    value: '',
                    isValid : false,
                    touched: false
                },
                addingToMenu: false
            };
        case actionTypes.ENABLE_ADDING_TO_MENU:
            return {
                ...state,
                addingToMenu: true
            };
        default:
            return state;
    }
}

export default reducer;
//ACTION CREATORS FOR BURGER BUILDER

import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const cancelAddingToMenu = () => {
    return{
        type: actionTypes.CANCEL_ADDING_TO_MENU
    }
}

export const enableAddingToMenu = () => {
    return{
        type: actionTypes.ENABLE_ADDING_TO_MENU
    }
}

export const changeBurgerName= (changedName) => {
    return{
        type: actionTypes.CHANGE_BURGER_NAME,
        newName: changedName
    }
}


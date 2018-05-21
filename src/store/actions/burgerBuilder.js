//ACTION CREATORS FOR BURGER BUILDER

import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase';

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

export const addToMenuSuccess= () => {
    return{
        type: actionTypes.ADD_TO_MENU_SUCCESS
    }
}

export const addToMenuFail= (error) => {
    return{
        type: actionTypes.ADD_TO_MENU_FAIL,
        error: error
    }
}

export const addToMenuStart=()=>{
    return{
        type: actionTypes.ADD_TO_MENU_START
    }
}

export const addToMenu = (burgerData) => {
    return dispatch =>{
        dispatch( addToMenuStart() );
        axios.post('/burgers.json',burgerData)
            .then(response =>{
                dispatch( cancelAddingToMenu() );
                dispatch( addToMenuSuccess() );
            })
            .catch(error => dispatch(addToMenuFail(error)) );
    };
}
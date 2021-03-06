//ACTION CREATORS FOR THE MENU

import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase';

export const fetchBurgersSuccess = (burgers) => {
    return{
        type: actionTypes.FETCH_BURGERS_SUCCESS,
        burgers: burgers
    }
}

export const fetchBurgersFail = (error) => {
    return{
        type: actionTypes.FETCH_BURGERS_FAIL,
        error: error
    }
}

export const fetchBurgersStart = () => {
    return{
        type: actionTypes.FETCH_BURGERS_START
    }
}

export const fetchBurgers = () => {
    return dispatch => {
        dispatch(fetchBurgersStart());
        axios.get('/burgers.json')
            .then(res =>{
                const fetchedBurgers = [];
                for (let key in res.data){
                    fetchedBurgers.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchBurgersSuccess(fetchedBurgers))
            })
            .catch(error => dispatch(fetchBurgersFail(error)) );
    }
}

export const eatMeFail = (error) => {
    return{
        type: actionTypes.EAT_ME_FAIL,
        error: error
    }
}

export const eatMe = (burgerID) => {
    return dispatch => {
        axios.get('/burgers.json')
            .then(res =>{
                const burger = res.data[burgerID];
                let alertMsg = 'Burger not found. Sorry.';
                if(burger){
                    alertMsg = (
                        'GET Request sent!\n'+
                        'Unique ID stored in Firebase: '+burgerID+'\n'
                    );
                }
                alert(alertMsg);
            })
            .catch(error => dispatch(eatMeFail(error)) );
    }
} 

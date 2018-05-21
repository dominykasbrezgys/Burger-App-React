import * as actionTypes  from '../actions/actionTypes';

const initialState ={
    burgers : [],
    loading: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_BURGERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_BURGERS_SUCCESS:
            return {
                ...state,
                burgers: action.burgers,
                loading: false
            }
        case actionTypes.FETCH_BURGERS_FAIL:
            return {
                ...state,
                loading: false //TODO: store Error in the state?
            }
        case actionTypes.EAT_ME_FAIL:
            return {
                ...state, //TODO: store Error in the state?
            }
        default:
            return state
    }
}

export default reducer;
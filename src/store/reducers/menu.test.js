import reducer from './menu';
import * as actionTypes from '../actions/actionTypes';

describe('menu reducer', () =>{

    it('should return the initial state', () =>{
        expect(reducer(undefined, {})).toEqual({
            burgers : [],
            loading: false
        })
    });

    it('should set loading to true', () =>{
        expect(reducer({
            burgers : [],
            loading: false
            }, {type:actionTypes.FETCH_BURGERS_START}))
            .toEqual({
            burgers : [],
            loading: true
        })
    });

    it('should set fetched burgers', () =>{
        const someBurgers = [];
        someBurgers.pop({id:'someId', burgerName:'someName',ingredients: {salad: 1}});
        expect(reducer({
            burgers : [],
            loading: false
            }, {
                type: actionTypes.FETCH_BURGERS_SUCESS, 
                burgers: someBurgers
            }))
            .toEqual({
            burgers : someBurgers,
            loading: false
        })
    })

    it('should set loading to false', () =>{
        expect(reducer({
            burgers : [],
            loading: false
            }, {type:actionTypes.FETCH_BURGERS_FAIL}))
            .toEqual({
            burgers : [],
            loading: false
        })
    });

});

import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Burger from './Burger';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import Aux from '../../hoc/Aux/Aux';

configure({adapter: new Adapter()});

describe('Burger />', () =>{
    it('should render 2 <BurgerIngredient /> elements', ()=>{
        const wrapper = shallow(<Burger ingredients={{}}/>);
        expect(wrapper.find(BurgerIngredient)).toHaveLength(2);
    });

    it('should contain <BurgerIngredient /> element of salad', ()=>{
        const wrapper = shallow(<Burger ingredients={{salad: 1}}/>);
        expect(wrapper.contains(
            <BurgerIngredient key={'salad1'} type={'salad'}/> ))
            .toEqual(true);
    });

});

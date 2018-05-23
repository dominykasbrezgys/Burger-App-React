
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () =>{

    it('should render <BuildControls />', ()=>{
        let wrapper = shallow(<BurgerBuilder ings={{salad: 1}} />);
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should render <Burger />', ()=>{
        let wrapper = shallow(<BurgerBuilder ings={{salad: 1}} />);
        expect(wrapper.find(Burger)).toHaveLength(1);
    });

});

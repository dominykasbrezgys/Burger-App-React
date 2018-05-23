import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NaviggationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NaviggationItems />', () =>{
    it('should render TWO <NavigationItem /> elements', ()=>{
        const wrapper = shallow(<NaviggationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});

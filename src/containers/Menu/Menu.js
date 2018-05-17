import React,{Component} from 'react';
import MenuGrid from '../../components/MenuGrid/MenuGrid';

class Menu extends Component {
    sate = {
        burgers: []
    }

    render(){
        return <MenuGrid/>
    }
}

export default Menu;
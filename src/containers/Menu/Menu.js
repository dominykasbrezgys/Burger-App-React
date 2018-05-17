import React,{Component} from 'react';
import MenuGrid from '../../components/MenuGrid/MenuGrid';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-firebase';

class Menu extends Component {
    state = {
        burgers: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/burgers.json')
        .then(res =>{
            this.setState({burgers:res.data,loading:false})

        })
        .catch(error => console.log(error));
    }

    render(){
        return this.state.loading ? <Spinner/> : <MenuGrid burgers = {this.state.burgers}/>
    }
}

export default Menu;
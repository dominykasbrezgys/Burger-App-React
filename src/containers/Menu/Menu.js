import React,{Component} from 'react';
import MenuGrid from '../../components/MenuGrid/MenuGrid';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-firebase';
import networkErrorHandler from '../../hoc/networkErrorHandler/networkErrorHandler';

class Menu extends Component {
    state = {
        burgers: [],
        loading: true
    }

    eatMeHandler = (burgerID) =>{
        axios.get('/burgers.json')
            .then(res =>{
                const burger = res.data[burgerID];
                let alertMsg = 'Burger not found. Sorry.';
                if(burger){
                    alertMsg = (
                        'Unique ID stored in Firebase: '+burgerID+'\n'+
                        'Burger Name: '+burger.burgerName+'\n'+
                        'Ingredients: '+'\n'+
                        Object.keys(burger.ingredients).map(ingredientKey =>{
                            return ingredientKey+': '+burger.ingredients[ingredientKey]+'\n';
                        }));
                }
                alert(alertMsg);
            })
            .catch(error => alert(error));
    }

    componentDidMount(){
        axios.get('/burgers.json')
        .then(res =>{
            this.setState({burgers:res.data,loading:false})
        })
        .catch(error => console.log(error));
    }

    render(){
        return this.state.loading ? <Spinner/> : 
            <MenuGrid burgers = {this.state.burgers} eatMe ={this.eatMeHandler}/>
    }
}

export default networkErrorHandler(Menu,axios);
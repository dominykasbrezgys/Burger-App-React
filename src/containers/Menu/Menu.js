import React,{Component} from 'react';
import {connect} from 'react-redux';

import MenuGrid from '../../components/MenuGrid/MenuGrid';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-firebase';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as menuActions from '../../store/actions/index';

class Menu extends Component {

    eatMeHandler = (burgerID) =>{
        this.props.onEatMe(burgerID);
    }

    componentDidMount(){
        this.props.onFetchBurgers();
    }

    render(){
        return this.props.loading ? <Spinner/> : 
            <MenuGrid 
                burgers = {this.props.burgers} 
                eatMe ={this.eatMeHandler} />
    }
}

const mapStateToProps = state =>{
    return {
        burgers: state.menu.burgers,
        loading: state.menu.loading
    }
}

const mapDispatchToState = dispatch =>{
    return {
        onFetchBurgers: () => dispatch(menuActions.fetchBurgers()),
        onEatMe: (burgerID) => dispatch(menuActions.eatMe(burgerID))
    };
}

export default connect(mapStateToProps,mapDispatchToState)(withErrorHandler(Menu,axios));
import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler = () =>{
        //Using this because of setState asynchronous behaviour
        //Clean way of setting a state when it depends on the old state
        this.setState ((prevState) =>{
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render(){
        return(
            <Aux>
                <Toolbar drawerToggle={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className= {classes.Content} >
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
import React from 'react';
import classes from './AddBurgerItem.css';
import {withRouter} from 'react-router-dom';

const addBurgerItem = (props) =>(
    <div className={classes.AddBurger} onClick={()=>props.history.push('/')}/>
)

export default withRouter(addBurgerItem);
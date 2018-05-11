import React from 'react';
import classes from './Menu.css';

const menu = (props) =>(
    <div 
    className ={classes.Menu}
    onClick={props.clicked}>
        MENU
    </div>
)

export default menu;
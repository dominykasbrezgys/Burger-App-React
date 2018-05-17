import React from 'react';
import classes from './TripleBar.css';

const tripleBar = (props) =>(
    <div 
    className ={classes.TripleBar}
    onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default tripleBar;
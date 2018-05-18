import React from 'react';
import classes from './MenuItem.css';
import Burger from '../../Burger/Burger';

const MenuItem = (props) =>{
    return(
        <article className={classes.MenuItem}>
            <h1>{props.name}</h1>
            <Burger ingredients={props.ingredients} forGrid/>
        </article>
    );
}

export default MenuItem;
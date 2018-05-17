import React from 'react';
import classes from './MenuItem.css';
import Burger from '../../Burger/Burger';

const MenuItem = () =>{
    const ingredients = {
        salad: 1,
        bacon: 1,
        cheese: 1,
        meat: 1
    }
    return(
        <article className={classes.MenuItem}>
            <h1>Burger</h1>
            <Burger ingredients={ingredients} forGrid/>
        </article>
    );
}

export default MenuItem;
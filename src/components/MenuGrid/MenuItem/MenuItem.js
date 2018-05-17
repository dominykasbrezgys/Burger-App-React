import React from 'react';
import classes from './MenuItem.css'

const MenuItem = () =>{
    return(
        <article className={classes.MenuItem}>
            <h1>Burger</h1>
            <p>Something about the burger</p>
        </article>
    );
}

export default MenuItem;
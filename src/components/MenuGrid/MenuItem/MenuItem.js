import React from 'react';
import classes from './MenuItem.css';

const MenuItem = (props) =>{
    return(
        <article className={classes.MenuItem}>
            {props.children}
        </article>
    );
}

export default MenuItem;
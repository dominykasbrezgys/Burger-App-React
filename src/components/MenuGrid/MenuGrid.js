import React from 'react';
import MenuItem from './MenuItem/MenuItem';
import classes from './MenuGrid.css'

const MenuGrid = () =>{
    return (
        <section className={classes.MenuGrid}>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
        </section>
    );
}

export default MenuGrid;
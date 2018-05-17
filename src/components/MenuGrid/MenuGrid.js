import React from 'react';
import MenuItem from './MenuItem/MenuItem';
import classes from './MenuGrid.css'

const MenuGrid = (props) =>{
    console.log(Object.values(props.burgers));
    const burgers = Object.values(props.burgers).map((burger,index) =>{
        return (
            <MenuItem 
                key={index}
            />)
    });

    return (
        <section className={classes.MenuGrid}>
            {burgers}
        </section>
    );
}

export default MenuGrid;
import React from 'react';
import MenuItem from './MenuItem/MenuItem';
import AddBurgerItem from './MenuItem/AddBurgerItem/AddBurgerItem';
import classes from './MenuGrid.css';
import Burger from '../Burger/Burger'

const MenuGrid = (props) =>{
    console.log(Object.values(props.burgers));
    const burgers = Object.values(props.burgers).map((burger,index) =>{
        return (
            <MenuItem key={index}>
                <h1>{burger.burgerName}</h1>
                <Burger ingredients={burger.ingredients} forGrid/> 
            </MenuItem>)
    });

    return (
        <section className={classes.MenuGrid}>
            {burgers}
            <MenuItem>
                <AddBurgerItem/>
            </MenuItem>
        </section>
    );
}

export default MenuGrid;
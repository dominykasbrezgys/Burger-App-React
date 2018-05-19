import React from 'react';
import MenuItem from './MenuItem/MenuItem';
import AddBurgerItem from './MenuItem/AddBurgerItem/AddBurgerItem';
import classes from './MenuGrid.css';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const MenuGrid = (props) =>{
    let burgers = null;
    if(props.burgers){
        burgers = props.burgers.map(burger =>{
            return (
                <MenuItem key={burger.id}>
                    <h1>{burger.burgerName}</h1>
                    <Burger ingredients={burger.ingredients} forGrid/>
                    <p>Total: <strong> {burger.price.toFixed(2)} € </strong> </p>
                    <Button buttonType ='EatMe' clicked={()=>props.eatMe(burger.id)}>
                        Eat me
                    </Button>
                </MenuItem>)
        })
    }
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
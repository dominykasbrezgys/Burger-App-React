import React from 'react';
import MenuItem from './MenuItem/MenuItem';
import AddBurgerItem from './MenuItem/AddBurgerItem/AddBurgerItem';
import classes from './MenuGrid.css';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const MenuGrid = (props) =>{

    const burgers = Object.keys(props.burgers).map(bKey =>{
        return (
            <MenuItem key={bKey}>
                <h1>{props.burgers[bKey].burgerName}</h1>
                <Burger ingredients={props.burgers[bKey].ingredients} forGrid/>
                <Button buttonType ='EatMe' clicked={()=>props.eatMe(bKey)}>
                    Eat me
                </Button>
            </MenuItem>)
    });

    // const burgers = Object.values(props.burgers).map((burger,index) =>{

    //     return (
    //         <MenuItem 
    //             key={index}>
    //             <h1>{burger.burgerName}</h1>
    //             <Burger ingredients={burger.ingredients} forGrid/> 
    //         </MenuItem>)
    // });

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
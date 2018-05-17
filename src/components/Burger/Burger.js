import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props) =>{
    //Transforming ingredients object obtained from props into an array of <BurgerIngrendient> elements
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            //array's length depends on how many ingredients are there
            return [...Array(props.ingredients[ingredientKey])].map((_, i)=>{
                return <BurgerIngredient key={ingredientKey+i} type={ingredientKey}/>
            });
        })//arr:previousValue el: currentValue
        .reduce((arr,el)=>{
            return arr.concat(el)
        }, [] );//[] is the initial value
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    let burgerStyle = classes.Burger;
    if(props.forGrid){
        burgerStyle = classes.BurgerInMenuGrid
    }
    return(
        <div className={burgerStyle} >
        <BurgerIngredient type='bread-top' />
        {transformedIngredients}
        <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;
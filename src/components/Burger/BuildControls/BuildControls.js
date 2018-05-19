import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Middle Bread', type:'breadMiddle'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong> {props.price.toFixed(2)} €</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key= {ctrl.label} 
            label= {ctrl.label}
            addIngredient = { () => props.addIngredient(ctrl.type) }
            removeIngredient = { () => props.removeIngredient(ctrl.type) }
            disabled = {props.disabled[ctrl.type]}/>
            ))}
        <button 
            className={classes.AddToMenuButton} 
            disabled={!props.canBeAdded}
            onClick={props.addToMenu}>
            ADD TO MENU</button>
    </div>
);

export default buildControls;
import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const summary = Object.keys(props.ingredients)
    .map(key => {
        return (<li key={key}>
            <span style={{textTransform : 'capitalize'}}>{key} </span> 
            x {props.ingredients[key]}
            </li>)
    });

    return (
        <Aux>
            <h3>Your order: </h3>
            <p>you have chosen the following ingredients:</p>
            <ul>
                {summary}
            </ul>
            <p>Total: <strong> {props.totalPrice.toFixed(2)} € </strong> </p>
            <p>Checkout?</p>
            <Button buttonType='Danger' clicked={props.cancel}>CANCEL</Button>
            <Button buttonType='Success' clicked={props.continue}>CHECKOUT</Button>
        </Aux>
    );
}
export default orderSummary;
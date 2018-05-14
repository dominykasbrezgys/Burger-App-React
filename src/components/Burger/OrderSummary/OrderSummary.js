import React,{Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{

    // componentWillUpdate() {
    //     console.log('[OrderSummary] WillUpdate');
    // }

    render(){
        const summary = Object.keys(this.props.ingredients)
        .map(key => {
            return (<li key={key}>
                <span style={{textTransform : 'capitalize'}}>{key} </span> 
                x {this.props.ingredients[key]}
                </li>)
        });

        return (
            <Aux>
                <h3>Your order: </h3>
                <p>you have chosen the following ingredients:</p>
                <ul>
                    {summary}
                </ul>
                <p>Total: <strong> {this.props.totalPrice.toFixed(2)} € </strong> </p>
                <p>Checkout?</p>
                <Button buttonType='Danger' clicked={this.props.cancel}>CANCEL</Button>
                <Button buttonType='Success' clicked={this.props.continue}>CHECKOUT</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
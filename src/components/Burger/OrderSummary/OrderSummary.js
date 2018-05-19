import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
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
                <h3>Your Burger: </h3>
                <ul>
                    {summary}
                </ul>
                <p>Total: <strong> {this.props.totalPrice.toFixed(2)} € </strong> </p>
                Burger Name: <input type='text' onChange={this.props.burgerNameHandler} />
                <p>Add to menu?</p>
                <Button buttonType='Success' clicked={this.props.continue}>ADD</Button>
                <Button buttonType='Danger' clicked={this.props.cancel}>CANCEL</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
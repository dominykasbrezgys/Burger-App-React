import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

class BurgerSummary extends Component{

    render(){
        const summary = Object.keys(this.props.ingredients)
        .map(key => {
            return (<li key={key}>
                <span style={{textTransform : 'capitalize'}}>{key} </span> 
                x {this.props.ingredients[key]}
                </li>)
        });

        let validationMsg = null;
        if( !this.props.nameInput.isValid && this.props.nameInput.touched){
            validationMsg = <p style={{color:'red'}}>Burger name can't be empty!</p>
        }
    
        return (
            <Aux>
                <h3>Your Burger: </h3>
                <ul>
                    {summary}
                </ul>
                <p>Total: <strong> {this.props.totalPrice.toFixed(2)} € </strong> </p>
                <input type='text' onChange={this.props.burgerNameHandler}/>
                {validationMsg}
                <p>Add to menu?</p>
                <Button buttonType='Success' clicked={this.props.continue} isDisabled={!this.props.nameInput.isValid}>ADD</Button>
                <Button buttonType='Danger' clicked={this.props.cancel}>CANCEL</Button>
            </Aux>
        );
    }
}

export default BurgerSummary;
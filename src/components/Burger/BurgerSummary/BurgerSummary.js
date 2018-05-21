import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import * as burgerBuilderActions from '../../../store/actions/index';

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
                <input type='text' onChange={(event) => this.props.onBurgerNameChanged(event.target.value)} value={this.props.nameInput.value} />
                {validationMsg}
                <p>Add to menu?</p>
                <Button buttonType='Success' clicked={this.props.continue} isDisabled={!this.props.nameInput.isValid}>ADD</Button>
                <Button buttonType='Danger' clicked={this.props.cancel}>CANCEL</Button>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        nameInput: state.burgerNameInput
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerNameChanged: (newValue) => dispatch( burgerBuilderActions.changeBurgerName(newValue) )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerSummary);
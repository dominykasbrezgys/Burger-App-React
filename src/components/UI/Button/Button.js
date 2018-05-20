import React from  'react';
import classes from './Button.css';

const button = (props) => {
    const styles = [classes.Button, classes[props.buttonType]] ;
    if (props.isDisabled){
        styles.push(classes.Disabled);
    }
    return(
        <button
            className ={styles.join(' ')}
            onClick={props.clicked}
            disabled={props.isDisabled}>
            {props.children}
        </button>
    );
}


export default button;
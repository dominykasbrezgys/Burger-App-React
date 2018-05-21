import React from  'react';
import classes from './Button.css';

const button = (props) => (
        <button
            className ={[classes.Button, classes[props.buttonType]].join(' ')}
            onClick={props.clicked}
            disabled={props.isDisabled}>
            {props.children}
        </button>
);

export default button;
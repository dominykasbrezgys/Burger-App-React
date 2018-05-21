import React from  'react';
import Button from '../Button/Button';
import classes from './Success.css';

const success = (props) => (
    <div className={classes.Success}>
        <h1>Success!</h1>
        <Button buttonType='Danger' clicked={props.cancel}>
            Dismiss
        </Button>
    </div>
);

export default success;
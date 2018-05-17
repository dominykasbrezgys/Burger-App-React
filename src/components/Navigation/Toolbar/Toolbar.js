import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import TripleBar from '../TripleBar/TripleBar';

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <TripleBar clicked={props.drawerToggle}/>
        <Logo height='80%'/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar;
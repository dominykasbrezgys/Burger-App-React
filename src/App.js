import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Menu from './containers/Menu/Menu';
import NotFound from './components/NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/menu' exact component={Menu}/>
            <Route path='/' exact component={BurgerBuilder}/>
            <Route component={ NotFound }/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

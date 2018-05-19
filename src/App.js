import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Menu from './containers/Menu/Menu';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Menu/>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;

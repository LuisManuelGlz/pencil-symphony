import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/auth'

import Navation from './components/layout/Navigation';
import Routes from './components/routing/Routes';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser(localStorage.token));
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navation />
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

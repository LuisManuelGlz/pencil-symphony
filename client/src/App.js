import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Navation from './components/layout/Navigation';
import Routes from './components/routing/Routes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navation />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

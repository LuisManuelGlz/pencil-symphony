import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navation from './components/layout/Navigation';
import Routes from './components/routing/Routes';

function App() {
  return (
    <BrowserRouter>
      <Navation />
      <Routes />
    </BrowserRouter>
  );
}

export default App;

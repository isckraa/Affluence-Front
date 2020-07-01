import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <AnimatePresence>
            <Switch>
              <Route exact path='/affluence/' component={HomePage} />
              <Route exact path='/affluence/login' component={Login} />
              <Route exact path='/affluence/register' component={SignUp} />
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;

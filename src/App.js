import React from 'react';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Login /> */}
        <HomePage />
      </header>
    </div>
  );
}

export default App;

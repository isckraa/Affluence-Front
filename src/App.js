import React from 'react';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <SignUp/> */}
        {/* <Login /> */}
        <HomePage />
      </header>
    </div>
  );
}

export default App;

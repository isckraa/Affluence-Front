import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

let elem = document.querySelector('.App');
let div = document.querySelector('.debugPosition');
console.log(div)
let x = 0;
let y = 0;
let mousedown = false;

  // div event mousedown 
div.addEventListener('mousedown', function (e) {
    mousedown = true;
    x = div.offsetLeft - e.clientX; 
    y = div.offsetTop - e.clientY; 
}, true); 
  
// div event mouseup 
div.addEventListener('mouseup', function (e) { 
    // mouse state set to false 
    mousedown = false; 
}, true); 

// element mousemove to stop 
elem.addEventListener('mousemove', function (e) { 
    // Is mouse pressed 
    if (mousedown) { 
        // Now we calculate the difference upwards 
        div.style.left = e.clientX + x + 'px'; 
        div.style.top = e.clientY + y + 'px'; 
    } 
}, true);
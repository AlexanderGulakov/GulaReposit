import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const clickButton = function (e) {
    console.log(e.target);
};

ReactDOM.render(<App onButtonClick={clickButton} />, document.getElementById('root'));
registerServiceWorker();
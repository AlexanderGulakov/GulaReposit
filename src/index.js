import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root';
import SignUp from './components/SignUp';
import registerServiceWorker from './registerServiceWorker'; // It's all about adding offline capabilities to your site.
import {BrowserRouter} from 'react-router-dom'

const clickButton = function (e) {
    console.log(e.target);
};


ReactDOM.render(
    <BrowserRouter>
        <Root/>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
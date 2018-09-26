import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reducer from './reducers/reducer';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);


ReactDOM.render(
    <BrowserRouter>
        <Provider store = {store} >
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();

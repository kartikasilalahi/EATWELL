import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'mdbreact/dist/css/mdb.css'
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-web-tabs/dist/react-web-tabs.min.css'
import 'react-toastify/dist/ReactToastify.css';
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './redux/reducer'
import ToTop from './toTop'


const store = createStore(Reducer, {}, applyMiddleware(ReduxThunk))


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ToTop />
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));


serviceWorker.unregister();

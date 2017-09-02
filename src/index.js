import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxthunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise';
import { firebaseApp } from './firebase';
import { logUser } from './actions';

import App from './components/App';
import reducers from './reducers';

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user sign in', user);
        store.dispatch(logUser(user.uid));
    } else {
        console.log('missing user');
    }
});

const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(promiseMiddleware, reduxthunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);

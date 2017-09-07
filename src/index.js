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
        store.dispatch(logUser({ userId: user.uid, email: user.email }));
    } else {
        console.log('Need to Be Log In.....');
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

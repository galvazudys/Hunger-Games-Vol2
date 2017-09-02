import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Calculator from './Calculator';
import Home from './Home';
import SignIn from './SignIn';
import Register from './Register';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/calculator"
                            component={Calculator}
                        />
                        <Route exact path="/signin" component={SignIn} />
                        <Route exact path="/register" component={Register} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);

import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { grey50, deepPurpleA100 } from 'material-ui/styles/colors';
import { firebaseApp } from '../firebase';
import Subheader from 'material-ui/Subheader';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            },
            redirect: false
        };
    }

    signIn() {
        console.log(this.state);
        const { email, password } = this.state;
        firebaseApp
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ redirect: true });
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <Subheader>
                            <h1>Sign In</h1>
                        </Subheader>
                        <TextField
                            onChange={e =>
                                this.setState({ email: e.target.value })}
                            hintText="email"
                            floatingLabelText="Email"
                        />
                        <br />
                        <TextField
                            onChange={e =>
                                this.setState({ password: e.target.value })}
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                        />
                        <br />
                        <br />
                        <RaisedButton
                            label="Sing In"
                            labelColor={grey50}
                            backgroundColor={deepPurpleA100}
                            onClick={this.signIn.bind(this)}
                        />
                    </div>
                </MuiThemeProvider>
                <div>{this.state.error.message}</div>
            </div>
        );
    }
}

export default SignIn;

import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { grey50, deepPurpleA100 } from 'material-ui/styles/colors';
import { firebaseApp } from '../firebase';
import Subheader from 'material-ui/Subheader';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }
        };
    }

    register() {
        console.log(this.state);
        const { email, password } = this.state;
        firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({ error });
            });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <Subheader>
                            <h1>Register</h1>
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
                            label="Register"
                            labelColor={grey50}
                            backgroundColor={deepPurpleA100}
                            onClick={this.register.bind(this)}
                        />
                    </div>
                </MuiThemeProvider>
                <div>{this.state.error.message}</div>
            </div>
        );
    }
}

export default Register;

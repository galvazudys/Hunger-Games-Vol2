import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { grey50, deepPurpleA100 } from 'material-ui/styles/colors';
import { firebaseApp } from '../firebase';
import _ from 'lodash';

class Header extends Component {
    signOut() {
        firebaseApp.auth().signOut();
        this.props.history.push('/signin');
    }

    render() {
        const userExistToLogOut = !_.isEmpty(this.props.user) ? (
            <MenuItem onClick={() => this.signOut()} primaryText="Logout" />
        ) : (
            <Link style={{ textDecoration: 'none' }} to="/signin">
                <MenuItem primaryText="Sign In" />
            </Link>
        );

        return (
            <div>
                <MuiThemeProvider>
                    <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <FontIcon
                                    className="material-icons"
                                    style={{ color: '#f27e26' }}
                                >
                                    whatshot
                                </FontIcon>
                                <ToolbarTitle
                                    style={{
                                        fontFamily: "'Amatic SC', cursive"
                                    }}
                                    text="Hunger Games"
                                />
                            </Link>
                        </ToolbarGroup>
                        <ToolbarGroup lastChild={true}>
                            <FontIcon className="material-icons">
                                person
                            </FontIcon>
                            <ToolbarTitle
                                style={{ paddingRight: '0' }}
                                text={
                                    !_.isEmpty(this.props.user) ? (
                                        this.props.user.email
                                    ) : (
                                        <span style={{ color: '#f27e26' }}>
                                            Register
                                        </span>
                                    )
                                }
                            />
                            <IconMenu
                                iconButtonElement={
                                    <IconButton
                                        style={{ padding: '0' }}
                                        touch={true}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                            >
                                {_.isEmpty(this.props.user) ? (
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to="/register"
                                    >
                                        <MenuItem primaryText="Register" />
                                    </Link>
                                ) : null}
                                {userExistToLogOut}
                            </IconMenu>
                            <Link to="/calculator">
                                <RaisedButton
                                    backgroundColor={deepPurpleA100}
                                    label="Counter"
                                    labelColor={grey50}
                                />
                            </Link>
                        </ToolbarGroup>
                    </Toolbar>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user
    };
};

export default connect(mapStateToProps, null)(Header);

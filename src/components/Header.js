import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle
} from 'material-ui/Toolbar';
import { grey50, deepPurpleA100 } from 'material-ui/styles/colors';
import { firebaseApp } from '../firebase';

class Header extends Component {
    signOut() {
        firebaseApp.auth().signOut();
    }

    render() {
        const userExistToLogOut =
            this.props.user !== null ? (
                <MenuItem onClick={() => this.signOut()} primaryText="Logout" />
            ) : (
                <Link style={{ textDecoration: 'none' }} to="/signin">
                    <MenuItem primaryText="SignIn" />
                </Link>
            );

        return (
            <div>
                <MuiThemeProvider>
                    <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            <FontIcon
                                className="material-icons"
                                color={deepPurpleA100}
                            >
                                restaurant_menu
                            </FontIcon>
                            <ToolbarTitle text="Hunger Games" />
                        </ToolbarGroup>
                        <ToolbarGroup lastChild={true}>
                            <ToolbarTitle text="Profile" />
                            <IconMenu
                                iconButtonElement={
                                    <IconButton touch={true}>
                                        <NavigationExpandMoreIcon />
                                    </IconButton>
                                }
                            >
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to="/register"
                                >
                                    <MenuItem primaryText="Register" />
                                </Link>
                                {userExistToLogOut}
                            </IconMenu>

                            <FontIcon className="muidocs-icon-custom-sort" />
                            <ToolbarSeparator />
                            <Link to="/calculator">
                                <RaisedButton
                                    backgroundColor={deepPurpleA100}
                                    label="Calculator"
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

import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { grey50, deepPurpleA100 } from 'material-ui/styles/colors';
import { bindActionCreators } from 'redux';
import { fetchFood, fetchToTabel } from '../actions/index';
import { connect } from 'react-redux';
import _ from 'lodash';
import { List, ListItem } from 'material-ui/List';

import Calculation from './Calculation';
import Loader from './Loader';

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            openLoader: false
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange(e) {
        this.setState({ term: e.target.value });
    }

    onSubmit(e) {
        this.setState({ openLoader: true });
        this.props.fetchFood(this.state.term).then(() => {
            this.setState({ openLoader: false });
        });
        this.setState({ term: '' });
    }

    clickedItem(foodItem) {
        this.props.fetchToTabel(foodItem);
    }

    render() {
        const { food } = this.props;

        const newFood = _.map(food[0], foodItem => {
            return (
                <ListItem
                    key={foodItem._id}
                    secondaryText={
                        <p>
                            Calories per{' '}
                            {foodItem.fields.nf_serving_weight_grams}g is:{' '}
                            {foodItem.fields.nf_calories}cal, Sugar is :{' '}
                            {foodItem.fields.nf_sugars}
                        </p>
                    }
                    primaryText={
                        foodItem.fields.item_name +
                        '(' +
                        foodItem.fields.brand_name +
                        ')'
                    }
                    onClick={this.clickedItem.bind(this, foodItem)}
                />
            );
        });

        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <Calculation />
                        <TextField
                            style={{ marginTop: '60px' }}
                            value={this.state.term}
                            onChange={this.onInputChange}
                            hintText="Enter a Product"
                            floatingLabelText="Product Name"
                        />

                        <RaisedButton
                            label="Search"
                            labelColor={grey50}
                            backgroundColor={deepPurpleA100}
                            onClick={this.onSubmit}
                            style={{ marginLeft: '20px' }}
                        />

                        <br />
                        <span style={{ color: '#b991ff' }}>
                            <h3>Click on list item to add...</h3>
                        </span>
                        <Loader openLoader={this.state.openLoader} />
                        <List>{newFood}</List>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const mapStateToProps = ({ food }) => {
    return {
        food
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchFood, fetchToTabel }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);

import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { grey50, deepPurpleA100 } from 'material-ui/styles/colors';
import { bindActionCreators } from 'redux';
import { fetchFood } from '../actions/index';
import { connect } from 'react-redux';
import _ from 'lodash';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange(e) {
        this.setState({ term: e.target.value });
    }

    onSubmit(e) {
        this.props.fetchFood(this.state.term);
        this.setState({ term: '' });
    }

    clickedItem(foodId) {
        console.log(foodId);
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
                    onClick={this.clickedItem.bind(this, [
                        foodItem._id,
                        foodItem.fields.nf_calories
                    ])}
                />
            );
        });
        const preloader = () => {
            return <CircularProgress size={100} thickness={7} />;
        };
        const renderFoodOrPreloader = food ? newFood : preloader();
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            value={this.state.term}
                            onChange={this.onInputChange}
                            hintText="Hint Text"
                            floatingLabelText="Floating Label Text"
                        />
                        <div>
                            <RaisedButton
                                label="Submit"
                                labelColor={grey50}
                                backgroundColor={deepPurpleA100}
                                onClick={this.onSubmit}
                            />
                        </div>

                        <br />
                        <List>{renderFoodOrPreloader}</List>
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
    return bindActionCreators({ fetchFood }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);

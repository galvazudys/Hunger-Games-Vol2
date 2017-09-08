import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableFooter,
    TableRowColumn
} from 'material-ui/Table';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deleteFromTable, fetchUsersData } from '../actions/index';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import { database } from '../firebase';
import { firebaseApp } from '../firebase';

import _ from 'lodash';

class Calculation extends Component {
    state = {
        selected: [1],
        tableOfFood: this.props.tableFood ? this.props.tableFood : [],
        date: '',
        massage: {
            error: ''
        }
    };

    isSelected = index => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = selectedRows => {
        this.props.deleteFromTable(selectedRows);
    };

    saveToDatabase(e) {
        const firebaseUser = firebaseApp.auth().currentUser;
        if (firebaseUser.uid && this.state.date !== '') {
            database.ref(`users/${firebaseUser.uid}/${this.state.date}`).set({
                tableFood: this.props.tableFood
            });
        } else {
            this.setState({ massage: { error: 'Please pick a date' } });
        }
    }

    pickDate(e, date) {
        this.setState({ date: date });
    }
    loadFromDatabase() {
        const firebaseUser = firebaseApp.auth().currentUser;
        if (firebaseUser.uid && this.state.date !== '') {
            this.props.fetchUsersData(this.state.date);
        } else {
            this.setState({ massage: { error: 'Please pick a date' } });
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Table
                        height={'300px'}
                        fixedHeader={true}
                        fixedFooter={true}
                        onRowSelection={this.handleRowSelection}
                        selectable={true}
                    >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn> Fat </TableHeaderColumn>
                                <TableHeaderColumn> Sugar </TableHeaderColumn>
                                <TableHeaderColumn>protein</TableHeaderColumn>
                                <TableHeaderColumn>Weight(g)</TableHeaderColumn>
                                <TableHeaderColumn>Calories</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            stripedRows={true}
                        >
                            {!_.isEmpty(this.props.tableFood) ||
                            _.isNaN(this.props.tableFood) ? (
                                _.map(this.props.tableFood, (food, index) => {
                                    return (
                                        <TableRow
                                            key={food._id + Math.random() * 33}
                                        >
                                            <TableRowColumn>
                                                <span>
                                                    {food.fields.item_name}
                                                </span>
                                                <div
                                                    style={{ color: '#BDBDBD' }}
                                                >
                                                    Click To Remove...
                                                </div>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {food.fields.nf_total_fat}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {food.fields.nf_sugars}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {food.fields.nf_protein}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {
                                                    food.fields
                                                        .nf_serving_weight_grams
                                                }
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {food.fields.nf_calories}
                                            </TableRowColumn>
                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                        <TableFooter adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={{ color: '#1c0101' }}>
                                    Total
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    {_.round(
                                        _.sumBy(
                                            this.props.tableFood,
                                            x => x.fields.nf_total_fat
                                        ),
                                        2
                                    )}
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    {_.round(
                                        _.sumBy(
                                            this.props.tableFood,
                                            x => x.fields.nf_sugars
                                        ),
                                        2
                                    )}
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    {_.round(
                                        _.sumBy(
                                            this.props.tableFood,
                                            x => x.fields.nf_protein
                                        ),
                                        2
                                    )}
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    {_.round(
                                        _.sumBy(
                                            this.props.tableFood,
                                            x =>
                                                x.fields
                                                    .nf_serving_weight_grams,
                                            2
                                        )
                                    )}
                                </TableHeaderColumn>
                                <TableHeaderColumn>
                                    {_.round(
                                        _.sumBy(
                                            this.props.tableFood,
                                            x => x.fields.nf_calories
                                        ),
                                        2
                                    )}
                                </TableHeaderColumn>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <RaisedButton
                        onClick={this.saveToDatabase.bind(this)}
                        backgroundColor={'#f27e26'}
                        style={{
                            marginTop: '30px'
                        }}
                        label="Save"
                    />
                    <RaisedButton
                        onClick={this.loadFromDatabase.bind(this)}
                        backgroundColor={'#f27e26'}
                        style={{
                            marginTop: '30px',
                            marginLeft: '20px'
                        }}
                        label="Load"
                    />
                    <div style={{ color: '#d83d00' }}>
                        {this.state.massage.error}
                    </div>
                    <DatePicker
                        onChange={this.pickDate.bind(this)}
                        hintText="Pick before date 'SAVE' or 'LOAD'"
                        container="inline"
                        mode="landscape"
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}
const mapStateToProps = ({ tableFood }) => {
    return {
        tableFood
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ deleteFromTable, fetchUsersData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculation);

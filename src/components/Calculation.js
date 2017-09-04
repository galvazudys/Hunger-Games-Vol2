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
import { deleteFromTable } from '../actions/index';
import { bindActionCreators } from 'redux';

import _ from 'lodash';

class Calculation extends Component {
    state = {
        selected: [1],
        tableOfFood: this.props.tableFood ? this.props.tableFood : []
    };

    isSelected = index => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = selectedRows => {
        this.props.deleteFromTable(selectedRows);
    };

    render() {
        console.log(this.state.tableOfFood);
        return (
            <MuiThemeProvider>
                <Table
                    multiSelectable={true}
                    onRowSelection={this.handleRowSelection}
                    selectable={true}
                >
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Product Name</TableHeaderColumn>
                            <TableHeaderColumn> Fat </TableHeaderColumn>
                            <TableHeaderColumn> Sugar </TableHeaderColumn>
                            <TableHeaderColumn>protein</TableHeaderColumn>
                            <TableHeaderColumn>Weight(g)</TableHeaderColumn>
                            <TableHeaderColumn>Calories</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody stripedRows={true}>
                        {!_.isEmpty(this.props.tableFood) ? (
                            _.map(this.props.tableFood, (food, index) => {
                                return (
                                    <TableRow
                                        key={food._id + Math.random() * 33}
                                    >
                                        <TableRowColumn>
                                            {food.fields.item_name}
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
                    <TableFooter adjustForCheckbox={true}>
                        <TableRow>
                            <TableHeaderColumn>
                                Total Nutritions
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {_.sumBy(
                                    this.props.tableFood,
                                    x => x.fields.nf_total_fat
                                )}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {_.sumBy(
                                    this.props.tableFood,
                                    x => x.fields.nf_sugars
                                )}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {_.sumBy(
                                    this.props.tableFood,
                                    x => x.fields.nf_protein
                                )}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {_.sumBy(
                                    this.props.tableFood,
                                    x => x.fields.nf_serving_weight_grams
                                )}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {_.sumBy(
                                    this.props.tableFood,
                                    x => x.fields.nf_calories
                                )}
                            </TableHeaderColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
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
    return bindActionCreators({ deleteFromTable }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calculation);

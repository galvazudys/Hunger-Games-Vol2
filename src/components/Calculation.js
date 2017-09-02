import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import _ from 'lodash';

function SingleTableRow(food) {
    return (
        <TableRow>
            <TableRowColumn>{food.food.fields.item_name}</TableRowColumn>
            <TableRowColumn> {food.food.fields.nf_total_fat}</TableRowColumn>
            <TableRowColumn>{food.food.fields.nf_sugars}</TableRowColumn>
            <TableRowColumn>{food.food.fields.nf_protein}</TableRowColumn>
            <TableRowColumn>
                {food.food.fields.nf_serving_weight_grams}
            </TableRowColumn>
            <TableRowColumn>{food.food.fields.nf_calories}</TableRowColumn>
        </TableRow>
    );
}

class Calculation extends Component {
    state = {
        selected: [1]
    };

    isSelected = index => {
        console.log(index);
        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = selectedRows => {
        this.setState({
            selected: selectedRows
        });
    };

    render() {
        const cell = !_.isEmpty(this.props.tableFood)
            ? _.map(this.props.tableFood, (food, index) => {
                  console.log(food);
                  return (
                      <SingleTableRow
                          adjustForCheckbox={true}
                          key={food._id}
                          selected={this.isSelected(index)}
                          food={food}
                      />
                  );
              })
            : null;
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
                            <TableHeaderColumn>Fat</TableHeaderColumn>
                            <TableHeaderColumn>Sugar</TableHeaderColumn>
                            <TableHeaderColumn>protein</TableHeaderColumn>
                            <TableHeaderColumn>Weight(g)</TableHeaderColumn>
                            <TableHeaderColumn>Calories</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody stripedRows={true}>{cell}</TableBody>
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

export default connect(mapStateToProps, null)(Calculation);

import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from 'material-ui/Table';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SingleTableRow from './SingleTableRow';

import _ from 'lodash';

// function SingleTableRow(food) {
//     console.log(food);
//     return (

//     );
// }

class Calculation extends Component {
    state = {
        selected: [1]
    };

    isSelected = index => {
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
                  console.log(index);
                  return (
                      <SingleTableRow
                          adjustForCheckbox={true}
                          key={food._id + Math.random()}
                          selected={this.isSelected(index)}
                          food={food}
                          onRowClick={this.handleRowSelection}
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

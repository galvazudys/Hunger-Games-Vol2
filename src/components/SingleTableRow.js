import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

class SingleTableRow extends Component {
    render() {
        return (
            <TableRow striped={this.props.striped}>
                {this.props.children[0]}
                <TableRowColumn>
                    {this.props.food.fields.item_name}
                </TableRowColumn>
                <TableRowColumn>
                    {' '}
                    {this.props.food.fields.nf_total_fat}
                </TableRowColumn>
                <TableRowColumn>
                    {this.props.food.fields.nf_sugars}
                </TableRowColumn>
                <TableRowColumn>
                    {this.props.food.fields.nf_protein}
                </TableRowColumn>
                <TableRowColumn>
                    {this.props.food.fields.nf_serving_weight_grams}
                </TableRowColumn>
                <TableRowColumn>
                    {this.props.food.fields.nf_calories}
                </TableRowColumn>
            </TableRow>
        );
    }
}

export default SingleTableRow;

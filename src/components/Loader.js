import React from 'react';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

export default class Loader extends React.Component {
    render() {
        return (
            <div>
                <Dialog modal={false} open={this.props.openLoader}>
                    <CircularProgress size={100} thickness={7} />
                </Dialog>
            </div>
        );
    }
}

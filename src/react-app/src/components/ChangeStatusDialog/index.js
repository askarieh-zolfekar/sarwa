import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function ChangeStatusDialog(props) {
    const classes = useStyles();
    const { onClose, open, statuses, accountID } = props;

    const handleClose = () => {
        onClose(null);
    };

    const handleListItemClick = (value) => {
        onClose(value, accountID);
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">
                {(statuses && statuses.length === 0) ? "This account can't be moved to any status" : 'Change the account status to'}
            </DialogTitle>
            <List>
                {statuses.map(({status}) => (
                    <ListItem button onClick={() => handleListItemClick(status.code)} key={status.code}>
                        <ListItemText primary={status.name}/>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

ChangeStatusDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    statuses: PropTypes.string.isRequired,
};

export default ChangeStatusDialog;

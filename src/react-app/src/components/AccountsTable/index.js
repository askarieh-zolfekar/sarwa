import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {changeAccountStatusAction, listAccountsAction} from "../../actions/AccountActions";
import {connect, useSelector} from "react-redux";
import TableHead from "@material-ui/core/TableHead";
import {ACCOUNT_PAGINATION_SIZE} from "../../constants";
import Typography from "@material-ui/core/Typography";
import AccountsFilterList from "../AccountsFilterList";
import {getAccountsFilters} from "../../services/accounts";
import ChangeStatusDialog from "../ChangeStatusDialog";


const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

function CustomPaginationActionsTable(props) {
    const classes = useStyles2();
    const [filters, setFilters] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [accountID, setAccountID] = React.useState();
    const [filtersValues, setFiltersValues] = React.useState();
    const [statusesCanMoveTo, setStatusesCanMoveTo] = React.useState([]);

    const accounts = useSelector(({accountsReducer}) => accountsReducer.accounts);
    const {page, limit} = accounts;

    const handleClickOpen = (workflow, accountID) => {
        setStatusesCanMoveTo(workflow ? workflow : []);
        setAccountID(accountID);
        setOpen(true);
    };

    const handleClose = (value, accountID) => {
        setOpen(false);
        if(value) {
            try{
                props.changeAccountStatusAction(accountID, value);
            } catch (e) {

            }
        }
        // setSelectedValue(value);
    };

    const handleChangePage = (event, newPage) => {
        props.listAccountsAction(newPage + 1, filtersValues, limit)
    };

    const handleChangeRowsPerPage = (event) => {
        props.listAccountsAction(page, filtersValues, (parseInt(event.target.value, 10)));
        // setPage(0);
    };

    const onFiltersChanges = (values) => {
        setFiltersValues(values);
        props.listAccountsAction(page, values, limit)
    };


    React.useEffect(() => {
        props.listAccountsAction(page, filtersValues, limit);
        getAccountsFilters()
            .then(({data}) => {
                setFilters(data.data);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <div>
            <AccountsFilterList filters={filters} onFiltersChanges={onFiltersChanges}/>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Balance</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.docs.map((row) => (
                            <TableRow key={row.id} onClick={() => {handleClickOpen(row.workflow, row.id)}} style={{cursor: 'pointer'}}>
                                <TableCell style={{ width: 160 }}>
                                    {row.balance}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>
                                    {row.status.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={ACCOUNT_PAGINATION_SIZE}
                                colSpan={3}
                                count={accounts.totalDocs}
                                rowsPerPage={limit}
                                page={page - 1}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <ChangeStatusDialog onClose={handleClose} open={open} accountID={accountID} statuses={statusesCanMoveTo} />
        </div>
    );
}

// map state to props
const mapStateToProps = ({ accountsReducer }) => {
    const { accounts } = accountsReducer;
    return { accounts };
};

export default connect(mapStateToProps, {listAccountsAction, changeAccountStatusAction})(CustomPaginationActionsTable);

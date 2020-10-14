import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/styles";
import {FILTER_TYPE_DROPDOWN} from "../../constants";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const Filter = ({type, onValueChanges, filter}) => {
    const classes = useStyles();
    const [value, setValue] = useState(filter.values ? filter.values[0] : '');

    const handleValueChange = (event) => {
        setValue(event.target.value);
        onValueChanges(filter, event.target.value);
    };
    if (type === FILTER_TYPE_DROPDOWN) {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel id={`select-filter-label-${filter.code}`}>{filter.name}</InputLabel>
                <Select
                    labelId={`select-filter-label-${filter.code}`}
                    value={value}
                    onChange={handleValueChange}
                >
                    {filter.values.map(item => <MenuItem value={item.code}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
        );
    }
};

export default Filter;

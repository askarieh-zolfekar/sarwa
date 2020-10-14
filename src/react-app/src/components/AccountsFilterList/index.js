import React, {useEffect, useRef, useState} from 'react';
import Filter from "../Filter";

const AccountsFilterList = ({filters, onFiltersChanges}) => {
    const [filterValues, setFilterValues] = useState(undefined);
    const componentFilters = Object.keys(filters).map(key => {
        return (
            <Filter type={filters[key].type} filter={filters[key]} onValueChanges={(filter, value) => {
                const newFilter = filterValues ? {...filterValues} : {};
                newFilter[filter.code] = value;
                setFilterValues(newFilter);
                onFiltersChanges(newFilter);
            }}/>
        )
    });
    return (
        <div>
            {componentFilters}
        </div>
    )
};

export default AccountsFilterList;

import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Modal, TextField, debounce } from '@mui/material';
import { EntityForm } from './EntityForm';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected, setOpenAddModalStatus, title, setOpenUpdateModalStatus, handleFilterCallback, handleDeleteCallback, role } = props;
    const [showFilter, setShowFilter] = React.useState(false);
    const handleShowFilter = () => setShowFilter(!showFilter);

    const [filterValue, setFilterValue] = React.useState("");

    const handleFilterValueChange = (newFilterValue) => {
        setFilterValue(newFilterValue);
    }

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleFilterCallback(filterValue);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [filterValue]);

    const renderSelectedButtons = () => {
        if (numSelected > 0 && numSelected === 1) {
            return (
                <>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => setOpenUpdateModalStatus()}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    {
                        role === "ADMIN" ?
                            <Tooltip title="Delete">
                                <IconButton onClick={handleDeleteCallback}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            : <></>
                    }
                </>
            );
        } else if (numSelected > 0) {
            return (
                role === "ADMIN" ?
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDeleteCallback}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    : <></>
            );
        }
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {title}
                </Typography>
            )}

            {numSelected > 0 ? (
                renderSelectedButtons()
            ) : (
                <>
                    <Tooltip title="Add to list">
                        <IconButton onClick={() => setOpenAddModalStatus()}>
                            <AddOutlinedIcon />
                        </IconButton>
                    </Tooltip >

                    <Tooltip title="Filter list" placement="top">
                        <TextField sx={{
                            position: "absolute", top: "55px", opacity: 1, background: "white", width: "20ch",
                            visibility: showFilter ? "visible" : "hidden", zIndex: 3
                        }} label="Name" onChange={(event) => handleFilterValueChange(event.target.value)}>
                        </TextField>
                        <IconButton onClick={handleShowFilter}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )
            }
        </Toolbar >
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
    const { title, rows, headCells, formConfig, addDataCallback, updateDataCallback, addDataTitle, updateDataTitle, handleFilterCallback, handleDeleteCallback, role } = props;
    const [order, setOrder] = React.useState('asc');
    // TODO change default orderBy
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // add modal state
    const [addModalState, setAddModalState] = React.useState(false);
    const onCloseAddModal = () => setAddModalState(false);
    const onOpenAddModal = () => setAddModalState(true);

    // update modal state
    const [updateModalState, setUpdateModalState] = React.useState(false);
    const onCloseUpdateModal = () => setUpdateModalState(false);
    const onOpenUpdateModal = () => setUpdateModalState(true);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const _handleDeleteCallback = () => {
        handleDeleteCallback(selected);
        setSelected([]);
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    const rowToTableCells = (row, index) => {
        return (
            <>
                {
                    headCells.map((headCell, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        if (headCell.id === "name") {
                            return <TableCell
                                key={headCell.id}
                                component="th"
                                key={labelId}
                                scope="row"
                                padding="none"
                            >
                                {row[headCell.id]}
                            </TableCell>
                        } else {
                            return <TableCell key={labelId} align="right">{
                                typeof row[headCell.id] === "object" ? JSON.stringify(row[headCell.id]) : row[headCell.id]
                            }</TableCell>
                        }
                    })
                }
            </>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {/* add modal */}
                <Modal open={addModalState} onClose={onCloseAddModal}>
                    <Paper sx={{ width: "25%", margin: '5% auto' }}>
                        <EntityForm formConfig={formConfig} add={true} addDataCallback={addDataCallback} closeModalCallback={onCloseAddModal}
                            addDataTitle={addDataTitle}
                            updateDataTitle={updateDataTitle}
                        ></EntityForm>
                    </Paper>
                </Modal>
                {/* update modal */}
                <Modal open={updateModalState} onClose={onCloseUpdateModal}>
                    <Paper sx={{ width: "25%", margin: '5% auto' }}>
                        <EntityForm formConfig={formConfig} add={false} addDataCallback={updateDataCallback}
                            closeModalCallback={onCloseUpdateModal}
                            selectedItem={selected.length > 0 ? rows.find(row => row.id === selected[0]) : null}
                            addDataTitle={addDataTitle}
                            updateDataTitle={updateDataTitle}
                        >
                        </EntityForm>
                    </Paper>
                </Modal>
                <EnhancedTableToolbar title={title}
                    numSelected={selected.length}
                    setOpenAddModalStatus={onOpenAddModal}
                    setOpenUpdateModalStatus={onOpenUpdateModal}
                    handleFilterCallback={handleFilterCallback}
                    handleDeleteCallback={_handleDeleteCallback}
                    role={role}
                />
                <TableContainer sx={{ height: "400px" }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        {rowToTableCells(row, index)}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[rowsPerPage]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Paper >
        </Box >
    );
}
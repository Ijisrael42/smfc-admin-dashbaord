import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Delete as DeleteIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy])  return -1;
  if (b[orderBy] > a[orderBy])  return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0)  return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => { onRequestSort(event, property); };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount} checked={rowCount > 0 && numSelected === rowCount}
            color="primary" onChange={onSelectAllClick} inputProps={{ 'aria-label': 'select all desserts', }} />
        </TableCell>
        {props.headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
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
  headCells: PropTypes.array.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, handleClickOpen, module } = props;

  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity), }), }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div" >
          {numSelected} selected
        </Typography> ) 
      : ( <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div" >
          {module.toUpperCase()}S
        </Typography>
      )}

      { numSelected > 0 ? (
        <Tooltip title="Delete" onClick={handleClickOpen}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  module: PropTypes.string.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};

export default function EnhancedTable(props) {
  const { rows, headCells, module, selected, setSelected, deleteSelected } = props;
  
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  // const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => { setOpenDialog(true); };
  const handleClose = () => { setOpenDialog(false); };
  const gotoPage = (id) => { navigate(`/app/${module}/${id}`); };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1)  newSelected = newSelected.concat(selected, id);
    else if (selectedIndex === 0)  newSelected = newSelected.concat(selected.slice(1));
    else if (selectedIndex === selected.length - 1) newSelected = newSelected.concat(selected.slice(0, -1));
    else if (selectedIndex > 0)
      newSelected = newSelected.concat( selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1), );

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => { setPage(newPage); };
  const handleChangeDense = (event) => { setDense(event.target.checked); };
  const isSelected = (id) => selected.indexOf(id) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const convertToCells = (row, labelId) => {

    var cells = [], isFirst = true, link = row.id ? row.id : labelId;
    for (let x in row){
      if(isFirst) {
        cells.push(<TableCell  key={x} onClick={(event) => gotoPage(link)} component="th" id={labelId} scope="row" padding="none" >{row[x]}</TableCell>);
        isFirst = false;
      }
      else cells.push(<TableCell key={x} onClick={(event) => gotoPage(link)} align="left">{row[x]}</TableCell>);
    }
    return cells;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar module={module} handleClickOpen={handleClickOpen} numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead headCells={headCells} numSelected={selected.length} order={order} orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={rows?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  return (
                    <TableRow hover  role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected} >
                      <TableCell padding="checkbox">
                        <Checkbox onClick={(event) => handleClick(event, row.id)} color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId, }} />
                      </TableCell>
                      { convertToCells(row, labelId) }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows, }} > <TableCell colSpan={6} /> </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={rows.length} rowsPerPage={rowsPerPage}
          page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
      
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
        <DialogTitle id="alert-dialog-title"> {"Delete "} {module}s </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this module {module}{selected.length > 1 && "s" } 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => { deleteSelected(); handleClose();} } autoFocus> Yes </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

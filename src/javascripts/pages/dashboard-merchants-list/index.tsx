import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import clsx from 'clsx';
import * as _ from 'lodash';

// actions
import {DELETE_MERCHANT} from '../../actions/merchants';
import {SEARCH} from '../../actions/search';

// MUI
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';

// MUI Icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

// styles
import './style.scss';

// components
import DeleteModal from '../../components/delete-modal';

// variables
interface Column {
  id: string;
  name: string;
}

const columns: Column[] = [
  {
    id: 'id',
    name: 'ID',
  },
  {
    id: 'name',
    name: 'Name',
  },
];

// interface
interface Data {
  id: string;
  name: string;
  description: string;
  quantity: number;
  cq: number;
  price: number;
}

const MerchantsList = (props: any): ReactElement => {
  // variables
  const {history, deleteMerchant, merchants, search} = props;

  // use states
  const [dataRow, setDataRow] = React.useState([]);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [deleteMerchantName, setDeleteMechantName] = React.useState('');
  const [deleteMerchantID, setDeleteMechantID] = React.useState(0);
  const [page, setPage] = React.useState(0);

  // use effects
  React.useEffect(() => {
    setDataRow(merchants);
  }, [merchants]);

  // custom functions
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleAddMerchant = () => {
    search('');
    history.push('/dashboard-add');
  };

  const handleShowDeleteModal = (
    merchant_name: string,
    merchant_id: number
  ) => {
    setShowDeleteModal(true);
    setDeleteMechantName(merchant_name);
    setDeleteMechantID(merchant_id);
  };

  const handleDelete = (modal_status: boolean, delete_status: boolean) => {
    if (delete_status) {
      deleteMerchant(deleteMerchantID);
      setShowDeleteModal(modal_status);
    } else {
      setShowDeleteModal(modal_status);
    }
  };

  const handleEdit = (merchant_name: string, merchant_id: number) => {
    search('');
    history.push('/dashboard-edit/' + merchant_name + '/' + merchant_id);
  };

  const handleSort = (e: any, sort: string) => {
    const sorted = _.sortBy(dataRow, [sort]);
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      setDataRow(merchants);
    } else {
      e.target.classList.add('active');
      setDataRow(sorted);
    }
  };

  return (
    <div id="merchant-list">
      <DeleteModal
        show={showDeleteModal}
        data_name={deleteMerchantName}
        returnStatus={(modal_status: boolean, delete_status: boolean) =>
          handleDelete(modal_status, delete_status)
        }
      />
      <div className="content-header">
        <div>
          <h1>Merchants List</h1>
        </div>
        <div className="action-button">
          <Fab
            onClick={handleAddMerchant}
            color="primary"
            aria-label="Add Merchant"
          >
            <AddIcon />
          </Fab>
        </div>
      </div>

      <div className="merchant-list-table">
        <Paper className="root-table">
          <div className="wrapper-table">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, key) => (
                    <TableCell
                      key={key}
                      className={clsx(
                        'table-header',
                        column.id === 'id' ? 'header-id' : ''
                      )}
                    >
                      <div
                        className="sort"
                        onClick={e => handleSort(e, column.id)}
                      >
                        {column.name} <KeyboardArrowDownIcon />
                      </div>
                    </TableCell>
                  ))}
                  <TableCell className="table-header" key={3} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(dataRow).length > 0
                  ? dataRow
                      .slice(page * 10, page * 10 + 10)
                      .map((row: any, key: any) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={key}
                          >
                            {columns.map((column: any, key: any) => {
                              const value: any = row[column.id];
                              return (
                                <TableCell
                                  className={clsx(
                                    column.id === 'id' ? 'header-id' : ''
                                  )}
                                  key={column.id}
                                >
                                  {value}
                                </TableCell>
                              );
                            })}
                            <TableCell align="right" key={key + '-action'}>
                              <div>
                                <Button
                                  onClick={() =>
                                    handleEdit(row['name'], row['id'])
                                  }
                                  className="action-button-edit-button"
                                >
                                  <EditIcon />
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleShowDeleteModal(
                                      row['name'],
                                      row['id']
                                    )
                                  }
                                  className="action-button-delete-button"
                                >
                                  <DeleteIcon />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  : null}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[]}
            labelRowsPerPage=""
            component="div"
            count={dataRow.length}
            rowsPerPage={10}
            page={page}
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
          />
        </Paper>
      </div>
    </div>
  );
};

const stateToProps = ({merchants}: any) => ({
  merchants: merchants.merchants,
});

const actionsToProps = (dispatch: any) => ({
  deleteMerchant: (id: number) => dispatch(DELETE_MERCHANT(id)),
  search: (text: string) => dispatch(SEARCH(text)),
});

export default connect(stateToProps, actionsToProps)(MerchantsList);

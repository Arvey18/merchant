import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import * as _ from 'lodash';

// actions
import {UPDATE_MERCHANTS} from '../../actions/merchants';

// styles
import './style.scss';

// MUI
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const MerchantEdit = (props: any): ReactElement => {
  // variables
  const {history, match, updateMerchants} = props;

  // use states
  const [current, setCurrent] = React.useState<any>({
    id: parseInt(match.params.id),
    name: '',
    metro_manila: {
      box: true,
      oversized: true,
      big_pouch: true,
      small_pouch: true,
    },
    provincial: {
      box: true,
      oversized: true,
      big_pouch: true,
      small_pouch: true,
    },
    intra_provincial: {
      box: true,
      oversized: true,
      big_pouch: true,
      small_pouch: true,
    },
  });
  const [disableUpdate, setDisableUpdate] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  // use effects
  React.useEffect(() => {
    const merchants = localStorage.getItem('merchants');
    const merchant = _.find(JSON.parse(merchants || '[]'), {
      id: parseInt(match.params.id),
    });
    setCurrent({
      ...current,
      name: merchant.name,
      metro_manila: {
        box: merchant.metro_manila.box,
        oversized: merchant.metro_manila.oversized,
        big_pouch: merchant.metro_manila.big_pouch,
        small_pouch: merchant.metro_manila.small_pouch,
      },
      provincial: {
        box: merchant.provincial.box,
        oversized: merchant.provincial.oversized,
        big_pouch: merchant.provincial.big_pouch,
        small_pouch: merchant.provincial.small_pouch,
      },
      intra_provincial: {
        box: merchant.intra_provincial.box,
        oversized: merchant.intra_provincial.oversized,
        big_pouch: merchant.intra_provincial.big_pouch,
        small_pouch: merchant.intra_provincial.small_pouch,
      },
    });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (current.name.length > 0) {
      setDisableUpdate(false);
    } else {
      setDisableUpdate(true);
    }
  }, [current.name]);

  // custom functions
  const handleChange = (key: any) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const path = key.split('.');
    if (path.length === 1) {
      setCurrent({...current, [key]: event.target.value});
    }

    if (path.length === 2) {
      setCurrent({
        ...current,
        [path[0]]: {
          ...current[path[0]],
          [path[1]]: event.target.value,
        },
      });
    }
  };

  const handleUpdate = () => {
    updateMerchants(current);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    history.push('/dashboard-edit/' + current.name + '/' + current.id);
  };

  const handleCancel = () => {
    history.push('/dashboard');
  };

  const handleTab = (e: any) => {
    const elementNav = document.querySelectorAll('.nav-left-con');
    const elementNavContent = document.querySelectorAll('.content-right-con');
    if (elementNav !== null) {
      [].forEach.call(elementNav, (el: any) => {
        el.classList.remove('active');
      });
      e.target.classList.add('active');
    }

    if (elementNavContent !== null) {
      [].forEach.call(elementNavContent, (el: any) => {
        el.classList.remove('active');
      });
      const target = e.target.getAttribute('data-id');
      const elTarget = document.getElementById(target + '-con');
      if (elTarget !== null) {
        elTarget.classList.add('active');
      }
    }
  };

  return (
    <div id="merchant-edit">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Alert severity="success" variant="filled">
          {current.name} successfully updated!
        </Alert>
      </Snackbar>
      <div className="container">
        <div className="content-header with-line">
          <div>
            <h1>Edit Merchant Info</h1>
          </div>
        </div>
        {_.isEmpty(current) ? (
          <div>Data Not Found!</div>
        ) : (
          <div className="edit-form">
            <div className="nav-left">
              <div
                onClick={e => handleTab(e)}
                data-id="details"
                className="nav-left-con active"
              >
                Details
              </div>
              <div
                onClick={e => handleTab(e)}
                data-id="shipping"
                className="nav-left-con"
              >
                Shipping
              </div>
            </div>
            <div className="content-right">
              <div id="details-con" className="content-right-con active">
                <h3>Details</h3>
                <div className="fields-con">
                  <TextField
                    fullWidth={true}
                    id="merchant_name"
                    label="Merchant Name"
                    margin="normal"
                    autoComplete="off"
                    value={current.name}
                    onChange={handleChange('name')}
                  />
                </div>
              </div>
              <div id="shipping-con" className="content-right-con">
                <h3>Shipping</h3>
                <p>* radio button are true on left and false on right.</p>
                <div className="fields-con">
                  <div className="locations-shipping">
                    <h4>Manila</h4>
                    <div className="location-fields-con">
                      <div>
                        <FormLabel>Box</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.metro_manila.box === true ||
                              current.metro_manila.box === 'true'
                            }
                            onChange={handleChange('metro_manila.box')}
                            value={true}
                            name="metro-manila-box"
                            inputProps={{'aria-label': 'Box'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.metro_manila.box === false ||
                              current.metro_manila.box === 'false'
                            }
                            onChange={handleChange('metro_manila.box')}
                            value={false}
                            name="metro-manila-box"
                            inputProps={{'aria-label': 'Box'}}
                          />
                        </div>
                      </div>
                      <div>
                        <FormLabel>Oversized</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.metro_manila.oversized === true ||
                              current.metro_manila.oversized === 'true'
                            }
                            onChange={handleChange('metro_manila.oversized')}
                            value={true}
                            name="metro-manila-oversized"
                            inputProps={{'aria-label': 'Oversized'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.metro_manila.oversized === false ||
                              current.metro_manila.oversized === 'false'
                            }
                            onChange={handleChange('metro_manila.oversized')}
                            value={false}
                            name="metro-manila-oversized"
                            inputProps={{'aria-label': 'Oversized'}}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="location-fields-con">
                      <div>
                        <FormLabel>Big Pouch</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.metro_manila.big_pouch === true ||
                              current.metro_manila.big_pouch === 'true'
                            }
                            onChange={handleChange('metro_manila.big_pouch')}
                            value={true}
                            name="metro-manila-big-pouch"
                            inputProps={{'aria-label': 'big_pouch'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.metro_manila.big_pouch === false ||
                              current.metro_manila.big_pouch === 'false'
                            }
                            onChange={handleChange('metro_manila.big_pouch')}
                            value={false}
                            name="metro-manila-big-pouch"
                            inputProps={{'aria-label': 'big_pouch'}}
                          />
                        </div>
                      </div>
                      <div>
                        <FormLabel>Small Pouch</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.metro_manila.small_pouch === true ||
                              current.metro_manila.small_pouch === 'true'
                            }
                            onChange={handleChange('metro_manila.small_pouch')}
                            value={true}
                            name="metro-manila-small-pouch"
                            inputProps={{'aria-label': 'Small Pouch'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.metro_manila.small_pouch === false ||
                              current.metro_manila.small_pouch === 'false'
                            }
                            onChange={handleChange('metro_manila.small_pouch')}
                            value={false}
                            name="metro-manila-small-pouch"
                            inputProps={{'aria-label': 'Small Pouch'}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="locations-shipping">
                    <h4>Provincial</h4>
                    <div className="location-fields-con">
                      <div>
                        <FormLabel>Box</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.provincial.box === true ||
                              current.provincial.box === 'true'
                            }
                            onChange={handleChange('provincial.box')}
                            value={true}
                            name="provincial-box"
                            inputProps={{'aria-label': 'Box'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.provincial.box === false ||
                              current.provincial.box === 'false'
                            }
                            onChange={handleChange('provincial.box')}
                            value={false}
                            name="provincial-box"
                            inputProps={{'aria-label': 'Box'}}
                          />
                        </div>
                      </div>
                      <div>
                        <FormLabel>Oversized</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.provincial.oversized === true ||
                              current.provincial.oversized === 'true'
                            }
                            onChange={handleChange('provincial.oversized')}
                            value={true}
                            name="provincial-oversized"
                            inputProps={{'aria-label': 'Oversized'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.provincial.oversized === false ||
                              current.provincial.oversized === 'false'
                            }
                            onChange={handleChange('provincial.oversized')}
                            value={false}
                            name="provincial-oversized"
                            inputProps={{'aria-label': 'Oversized'}}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="location-fields-con">
                      <div>
                        <FormLabel>Big Pouch</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.provincial.big_pouch === true ||
                              current.provincial.big_pouch === 'true'
                            }
                            onChange={handleChange('provincial.big_pouch')}
                            value={true}
                            name="provincial-big-pouch"
                            inputProps={{'aria-label': 'big_pouch'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.provincial.big_pouch === false ||
                              current.provincial.big_pouch === 'false'
                            }
                            onChange={handleChange('provincial.big_pouch')}
                            value={false}
                            name="provincial-big-pouch"
                            inputProps={{'aria-label': 'big_pouch'}}
                          />
                        </div>
                      </div>
                      <div>
                        <FormLabel>Small Pouch</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.provincial.small_pouch === true ||
                              current.provincial.small_pouch === 'true'
                            }
                            onChange={handleChange('provincial.small_pouch')}
                            value={true}
                            name="provincial-small-pouch"
                            inputProps={{'aria-label': 'Small Pouch'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.provincial.small_pouch === false ||
                              current.provincial.small_pouch === 'false'
                            }
                            onChange={handleChange('provincial.small_pouch')}
                            value={false}
                            name="provincial-small-pouch"
                            inputProps={{'aria-label': 'Small Pouch'}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="locations-shipping">
                    <h4>Intra Provincial</h4>
                    <div className="location-fields-con">
                      <div>
                        <FormLabel>Box</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.intra_provincial.box === true ||
                              current.intra_provincial.box === 'true'
                            }
                            onChange={handleChange('intra_provincial.box')}
                            value={true}
                            name="intra-provincial-box"
                            inputProps={{'aria-label': 'Box'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.intra_provincial.box === false ||
                              current.intra_provincial.box === 'false'
                            }
                            onChange={handleChange('intra_provincial.box')}
                            value={false}
                            name="intra-provincial-box"
                            inputProps={{'aria-label': 'Box'}}
                          />
                        </div>
                      </div>
                      <div>
                        <FormLabel>Oversized</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.intra_provincial.oversized === true ||
                              current.intra_provincial.oversized === 'true'
                            }
                            onChange={handleChange(
                              'intra_provincial.oversized'
                            )}
                            value={true}
                            name="intra-provincial-oversized"
                            inputProps={{'aria-label': 'Oversized'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.intra_provincial.oversized === false ||
                              current.intra_provincial.oversized === 'false'
                            }
                            onChange={handleChange(
                              'intra_provincial.oversized'
                            )}
                            value={false}
                            name="intra-provincial-oversized"
                            inputProps={{'aria-label': 'Oversized'}}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="location-fields-con">
                      <div>
                        <FormLabel>Big Pouch</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.intra_provincial.big_pouch === true ||
                              current.intra_provincial.big_pouch === 'true'
                            }
                            onChange={handleChange(
                              'intra_provincial.big_pouch'
                            )}
                            value={true}
                            name="intra-provincial-big-pouch"
                            inputProps={{'aria-label': 'big_pouch'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.intra_provincial.big_pouch === false ||
                              current.intra_provincial.big_pouch === 'false'
                            }
                            onChange={handleChange(
                              'intra_provincial.big_pouch'
                            )}
                            value={false}
                            name="intra-provincial-big-pouch"
                            inputProps={{'aria-label': 'big_pouch'}}
                          />
                        </div>
                      </div>
                      <div>
                        <FormLabel>Small Pouch</FormLabel>
                        <div className="radio-buttons">
                          <Radio
                            color="primary"
                            checked={
                              current.intra_provincial.small_pouch === true ||
                              current.intra_provincial.small_pouch === 'true'
                            }
                            onChange={handleChange(
                              'intra_provincial.small_pouch'
                            )}
                            value={true}
                            name="intra-provincial-small-pouch"
                            inputProps={{'aria-label': 'Small Pouch'}}
                          />
                          <Radio
                            color="primary"
                            checked={
                              current.intra_provincial.small_pouch === false ||
                              current.intra_provincial.small_pouch === 'false'
                            }
                            onChange={handleChange(
                              'intra_provincial.small_pouch'
                            )}
                            value={false}
                            name="intra-provincial-small-pouch"
                            inputProps={{'aria-label': 'Small Pouch'}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="action-buttons">
                <Button
                  disabled={disableUpdate}
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
                <Button
                  onClick={handleCancel}
                  color="secondary"
                  variant="contained"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const stateToProps = () => ({});

const actionsToProps = (dispatch: any) => ({
  updateMerchants: (data: Object) => dispatch(UPDATE_MERCHANTS(data)),
});

export default connect(stateToProps, actionsToProps)(MerchantEdit);

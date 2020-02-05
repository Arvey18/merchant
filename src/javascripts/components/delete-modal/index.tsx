import React, {ReactElement} from 'react';

// styles
import './style.scss';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// interface
interface IProps {
  show: boolean;
  data_name: string;
  returnStatus: (status: boolean, removeData: boolean) => void;
}

export default function DeleteModal(props: IProps): ReactElement {
  // variables
  const {show, data_name, returnStatus} = props;

  // use states
  const [open, setOpen] = React.useState(false);

  // use effects
  React.useEffect(() => {
    setOpen(show);
  }, [show]);

  // custom functions
  const handleDialog = (status: boolean, removeData: boolean) => {
    returnStatus(status, removeData);
  };

  return (
    <Dialog
      className="delete-modal"
      open={open}
      onClose={() => handleDialog(false, false)}
    >
      <DialogTitle>
        Are you sure you want to <strong>{data_name}</strong>?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Clicking <span className="danger">Yes</span> Will Permanently Delete
          the Data and will not be able to recover.
          <br />
          Be careful!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDialog(false, false)} color="primary">
          No
        </Button>
        <Button
          className="danger"
          onClick={() => handleDialog(false, true)}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

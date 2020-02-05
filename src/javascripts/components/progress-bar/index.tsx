import React, {ReactElement} from 'react';
import clsx from 'clsx';
import {connect} from 'react-redux';

// MUI
import LinearProgress from '@material-ui/core/LinearProgress';

// styles
import './style.scss';

const ProgressBar = (props: any): ReactElement => {
  // variables
  const {showProgressBar, progressValue} = props;

  return (
    <div
      className={clsx('progress-bar-container', showProgressBar ? 'show' : '')}
    >
      <LinearProgress variant="determinate" value={progressValue} />
    </div>
  );
};

const stateToProps = ({apiCallProgress}: any) => ({
  showProgressBar: apiCallProgress.show,
  progressValue: apiCallProgress.progress,
});

const actionsToProps = (dispatch: any) => ({});

export default connect(stateToProps, actionsToProps)(ProgressBar);

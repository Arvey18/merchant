import React, {ReactElement} from 'react';
import {connect} from 'react-redux';

// styles
import './style.scss';

// images
import Avatar from '../../../assets/images/avatar.png';

const Settings = (props: any): ReactElement => {
  // variables
  const {user} = props;

  return (
    <div id="settings">
      <div className="container">
        <div className="content-header with-line">
          <div>
            <h1>Settings</h1>
          </div>
        </div>
        <div className="edit-form">
          <div className="nav-left">
            <div data-id="profile" className="nav-left-con active">
              Profile
            </div>
          </div>
          <div className="content-right">
            <div id="profile-con" className="content-right-con active">
              <h3>Profile</h3>
              <div className="data-con">
                <img src={Avatar} alt="avatar" />
                <div className="user-name">{user.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const stateToProps = ({user}: any) => ({
  user: user.current_user,
});

const actionsToProps = (dispatch: any) => ({});

export default connect(stateToProps, actionsToProps)(Settings);

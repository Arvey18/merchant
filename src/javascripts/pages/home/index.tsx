import React, {ReactElement} from 'react';
import {connect} from 'react-redux';

// actions
import {LOGIN} from '../../actions/login';
import {GET_MERCHANTS} from '../../actions/merchants';

// MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// MUI Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// styles
import './style.scss';

// components
import Logo from '../../components/logo';

const Home = (props: any): ReactElement => {
  // variables
  const {history, login, getMerchants} = props;

  // use states
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [disablebutton, setDisableButton] = React.useState(true);

  // use effects
  React.useEffect(() => {
    document.title = 'Merchant';
    const login = localStorage.getItem('login');
    const merchants = JSON.parse(localStorage.getItem('merchants') || '[]');
    if (login === 'true') {
      if (Object.keys(merchants).length === 0) {
        getMerchants();
      }
      history.push('/dashboard');
    } else {
      localStorage.setItem('login', 'false');
      localStorage.removeItem('user_id');
      localStorage.removeItem('merchants');
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const handleCheckInput = () => {
      if (username !== '' && password !== '') {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    };
    handleCheckInput();
  }, [username, password]);

  // custom functions
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (username !== '' && password !== '') {
      login(username, password).then((result: any) => {
        if (result.status === 200 && result.data.length > 0) {
          result.data.map((value: any, key: number) => {
            if (value.username === username && value.password === password) {
              localStorage.setItem('login', 'true');
              localStorage.setItem('user_id', value.id);
              localStorage.setItem('merchants', JSON.stringify([]));
              getMerchants();
              history.push('/dashboard');
            } else {
              setErrorMessage(
                'You have entered incorrect Username or Password.'
              );
            }
            return false;
          });
        }
      });
    } else {
      setErrorMessage('Please enter Username and Password.');
    }
  };

  return (
    <div id="home">
      <div className="container">
        <Logo />
        <div className="textfield-con">
          <TextField
            fullWidth={true}
            id="username"
            label="Username"
            margin="normal"
            autoComplete="off"
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            value={username}
            error={errorMessage !== '' ? true : false}
          />
          <TextField
            fullWidth={true}
            id="password"
            label="Password"
            type="password"
            autoComplete="off"
            margin="normal"
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            value={password}
            error={errorMessage !== '' ? true : false}
          />
          <div className="error">{errorMessage}</div>
        </div>
        <Button
          startIcon={<ExitToAppIcon />}
          size="large"
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={handleLogin}
          disabled={disablebutton}
        >
          Sign In
        </Button>
        <div className="forgot-password">Forgot your password?</div>
      </div>
      <div className="create-account">
        Don't have an account? <a href="/">Create One</a>
      </div>
    </div>
  );
};

const stateToProps = () => ({});

const actionsToProps = (dispatch: any) => ({
  login: (username: string, password: string) =>
    dispatch(LOGIN(username, password)),
  getMerchants: () => dispatch(GET_MERCHANTS()),
});

export default connect(stateToProps, actionsToProps)(Home);

import * as React from 'react';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

// MUI
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

// styles
import '../stylesheets/index.scss';

// components
import Route from './settings/route';
import ProgressBar from './components/progress-bar';

// variables
const customHistory = createBrowserHistory();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#28264C',
    },
    secondary: {
      main: '#959EC9',
    },
    error: {
      main: '#A40033',
    },
  },
});

export default function App() {
  return (
    <div id="App">
      <ThemeProvider theme={theme}>
        <ProgressBar />
        <Router history={customHistory}>
          <Route />
        </Router>
      </ThemeProvider>
    </div>
  );
}

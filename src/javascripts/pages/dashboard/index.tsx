import React, {ReactElement} from 'react';
import {connect} from 'react-redux';
import clsx from 'clsx';
import {Route} from 'react-router-dom';

// actions
import {GET_USER} from '../../actions/users';
import {SEARCH} from '../../actions/search';
import {SEARCH_MERCHANTS} from '../../actions/merchants';

// styles
import './style.scss';

// MUI
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import {useStyles} from './style';

// MUI ICONS
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// images
import AvatarImage from '../../../assets/images/avatar.png';

// components
import Logo from '../../components/logo';
import MerchantsList from '../dashboard-merchants-list';
import MerchantEdit from '../dashboard-edit-merchant';
import MerchantAdd from '../dashboard-add-merchant';
import Settings from '../dashboard-settings';

const Dashboard = (props: any): ReactElement => {
  // variables
  const classes = useStyles();
  const {
    user,
    history,
    getUser,
    search,
    search_text,
    searchMerchants,
    match,
  } = props;
  const location = history.location.pathname;
  const menus = [
    {
      text: 'Dashboard',
      icon: <HomeIcon className={classes.icon} />,
      route: '/dashboard',
      active: location === '/dashboard' ? true : false,
    },
    {
      text: 'Settings',
      icon: <SettingsIcon className={classes.icon} />,
      route: '/dashboard-settings',
      active: location === '/dashboard-settings' ? true : false,
    },
  ];

  // use states
  const [open, setOpen] = React.useState(false);

  // use effects
  React.useEffect(() => {
    document.title = 'Dashboard';
    const user_id = localStorage.getItem('user_id');
    if (user_id !== null) {
      getUser(parseInt(user_id));
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    searchMerchants(search_text);
    // eslint-disable-next-line
  }, [search_text]);

  // custom functions
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.setItem('login', 'false');
    localStorage.removeItem('merchants');
    localStorage.removeItem('user_id');
    history.push('/');
  };

  const handleChangeRoute = (route: string) => {
    history.push(route);
  };

  return (
    <div id="dashboard" className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            className={clsx(classes.clicker, 'nav-titles')}
          >
            {match.params.id !== undefined ? (
              <div className={classes.root}>
                <div
                  onClick={() => handleChangeRoute('/dashboard')}
                  className={classes.prevRoute}
                >
                  Dashboard /{' '}
                </div>
                <div className={clsx(classes.currentRoute, 'current-route')}>
                  <div>{match.params.name}</div>
                </div>
              </div>
            ) : (
              <div onClick={() => handleChangeRoute('/dashboard')}>
                Dashboard
              </div>
            )}
          </Typography>
          <div className={clsx(classes.flexGrow, 'search-navigation-con')}>
            {location === '/dashboard' ? (
              <div className={clsx(classes.search)}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search Merchant…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={search_text}
                  inputProps={{'aria-label': 'search merchant'}}
                  onChange={e => search(e.target.value as string)}
                />
              </div>
            ) : null}
          </div>
          <Grid className={clsx(classes.avatarCon, 'right-options-con')}>
            <div
              onClick={() => handleChangeRoute('/dashboard-settings')}
              className={classes.avatarClicker}
            >
              <Avatar
                alt="profile-pic"
                src={AvatarImage}
                className={classes.avatarImage}
              />
              <Typography noWrap className={classes.avatarName}>
                {user.name}
              </Typography>
            </div>
            <Divider
              className={classes.appBarMenuDivider}
              orientation="vertical"
            />
            <IconButton
              onClick={handleLogout}
              aria-label="log out"
              size="small"
            >
              <MeetingRoomIcon className={classes.logoutIcon} />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(
          classes.drawer,
          {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          },
          'drawer-con'
        )}
        classes={{
          paper: clsx(
            {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            },
            'drawer-paper'
          ),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <Logo addClass="small" />
        </div>
        <div className="mobile-avatar">
          <Avatar
            alt="profile-pic"
            src={AvatarImage}
            className="mobile-avatar-image"
          />
          <Typography noWrap className="mobile-name">
            {user.name}
          </Typography>
          <div className="action-links">
            <div onClick={() => handleChangeRoute('/dashboard-settings')}>
              Profile
            </div>
            <div className="separator"></div>
            <div onClick={handleLogout}>Sign Out</div>
          </div>
        </div>
        <List className={classes.menuConList}>
          {menus.map((val, index) => (
            <ListItem
              className={clsx(classes.menuButtonList, {
                [classes.activeMenu]: val.active,
              })}
              button
              key={index}
              onClick={() => handleChangeRoute(val.route)}
            >
              <ListItemIcon
                className={clsx(classes.iconMenu, {
                  [classes.iconMenuActive]: val.active,
                })}
              >
                {val.icon}
              </ListItemIcon>
              <ListItemText
                classes={{primary: classes.iconText}}
                primary={val.text}
              />
            </ListItem>
          ))}
        </List>
        <div className="mobile-footer-nav">
          {location === '/dashboard' ? (
            <div className={clsx(classes.search)}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Merchant…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={search_text}
                inputProps={{'aria-label': 'search merchant'}}
                onChange={e => search(e.target.value as string)}
              />
            </div>
          ) : null}
          <Button
            onClick={handleDrawerOpen}
            className="close-nav-btn"
            variant="contained"
            color="primary"
          >
            <ArrowBackIcon />
          </Button>
        </div>
      </Drawer>
      <main className={clsx(classes.content, 'main-container')}>
        <Route exact path="/dashboard" component={MerchantsList} />
        <Route
          exact
          path="/dashboard-edit/:name/:id"
          component={MerchantEdit}
        />
        <Route exact path="/dashboard-add" component={MerchantAdd} />
        <Route exact path="/dashboard-settings" component={Settings} />
      </main>
    </div>
  );
};

const stateToProps = ({user, search}: any) => ({
  user: user.current_user,
  search_text: search.text,
});

const actionsToProps = (dispatch: any) => ({
  getUser: (id: number) => dispatch(GET_USER(id)),
  search: (text: string) => dispatch(SEARCH(text)),
  searchMerchants: (text: string) => dispatch(SEARCH_MERCHANTS(text)),
});

export default connect(stateToProps, actionsToProps)(Dashboard);

import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppBarLayout from "./AppBarLayout";
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import routes from '../../routes';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import Logo from "../../assets/images/logo.png";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `100%`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));
export default function DefaultLayout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const loading = () => (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{minHeight: '100vh'}} >
        <CircularProgress disableShrink/>
    </Grid>);
  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBarLayout classes={classes} signOut={props.signOut} handleOpenMenu={handleDrawerOpen} handleCloseMenu={handleDrawerClose}/>
          <main
              className={clsx(classes.content, {
                  [classes.contentShift]: !open,
              })}
          >
              <div className={classes.drawerHeader} />
              <Suspense fallback={loading}>
                  <Switch>
                      {routes.map((route, idx) => {
                          return route.component ? (
                              <Route
                                  key={idx}
                                  path={route.path}
                                  exact={route.exact}
                                  name={route.name}
                                  render={props => (
                                      <route.component
                                          {...props}/>
                                  )} />
                          ) : (null);
                      })}
                      <Redirect from="/" to="/home" />
                  </Switch>
              </Suspense>
          </main>
      </div>
  );
}


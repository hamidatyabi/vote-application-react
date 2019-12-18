import React, {Component} from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PropTypes from "prop-types";

class AppBarLayout extends Component{

  constructor(props, context) {
    super(props, context);

    this.state = {
      auth: this.props.auth,
      anchorEl: null,
      open: false,
      openMenu: false
    };

  }

  handleMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open:true
    })
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false
    })
  };

  handleDrawerOpen = () => {
    this.setState({
      openMenu: true
    }, () => {
      this.props.handleOpenMenu();
    })
  };

  handleDrawerClose = () => {
    this.setState({
      openMenu: false
    }, () => {
      this.props.handleCloseMenu();
    })
  };

  render (){
    const {classes} = (this.props);
    const {auth} = this.state;

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.openMenu,
            })}
        >
          <Toolbar>
            <Grid container>
              <Grid container item xs={6} justify="flex-start" alignItems="center">
                <IconButton onClick={this.handleDrawerOpen.bind(this)} edge="start"
                            className={clsx(classes.menuButton, this.state.openMenu && classes.hide)}
                            color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Photos
                </Typography>
              </Grid>
              <Grid container item xs={6} justify="flex-end" alignItems="center">
              {auth && (
                  <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={this.handleMenu.bind(this)}
                        color="inherit">
                      <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={this.state.open}
                        onClose={this.handleClose.bind(this)}>
                      <MenuItem onClick={this.handleClose.bind(this)}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose.bind(this)}>My account</MenuItem>
                    </Menu>
                  </div>
              )}
              </Grid>
            </Grid>
          </Toolbar>
          <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={this.state.openMenu}
              classes={{
                paper: classes.drawerPaper,
              }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose.bind(this)}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
              ))}
            </List>
          </Drawer>
        </AppBar>
    );
  }

}
AppBarLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOpenMenu: PropTypes.func,
  handleCloseMenu: PropTypes.func
};
export default AppBarLayout;

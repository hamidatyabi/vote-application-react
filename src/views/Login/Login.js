import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Config from '../../services/config/Config';
import { ThemeProvider } from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';
import Logo from "../../assets/images/logo.png";
import ButtonLoading from "../../components/ButtonLoading";
import {teal} from "@material-ui/core/colors";
import AuthenticationService from '../../services/service/AuthenticationService';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from "../../components/SnackbarContentWrapper";
import DataStore from "../../services/storage/DataStore";

const useStyles = theme => ({
    baseContainer: {
        backgroundColor: teal['A400'],
        padding: '0'
    },
    header: {
        padding: 20,
        minHeight: '60vh',
        backgroundColor: teal['A400']
    },
    footer: {
        padding: 20,
        minHeight: '40vh',
        backgroundColor: '#fff'
    },
    form: {
        width: '100%',
        marginBottom: 15
    },
    link: {
        textAlign: 'center',
        padding: '10px',
        display: 'block',
        color: '#333',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 200
    },
    button: {
        width: '100%',
        borderRadius: 0,
        padding: '12px',
        boxShadow: 'none',
        marginTop: '10px'
    }
});
class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        showPassword: false,
        password: '',
        username: '',
        snackOpen: false,
        snackText: '',
        snackColor: 'error'
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  handleChange = (prop, event) => {
    this.setState({
      [prop]: event.target.value
    });
  };
  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  handleSignInClick = (callback) => {
      AuthenticationService.token(this.state.username, this.state.password).then(response => {
          if(response.status === 200){
              DataStore.clear();
              DataStore.set("auth", response.result);
              this.props.isAuth();
          }else{
            this.setState({
                snackOpen: true,
                snackText: response.result,
                snackColor: "error"
            })
          }
          callback();
      })

  }
  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    this.setState({
        snackOpen: false
    });
  };

  render() {
        const {username, password, showPassword} = this.state;
        const {classes} = this.props;
        return (
            <ThemeProvider theme={Config.theme}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                  <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        className={classes.header} >
                    <Grid item xs={12}>
                      <img src={Logo} width={'100%'}/>
                    </Grid>

                  </Grid>
                  <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        className={classes.footer} >
                    <form noValidate autoComplete="off">
                      <FormControl className={classes.form}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            id="username"
                            type={'text'}
                            value={username}
                            onChange={this.handleChange.bind(this, 'username')}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                >
                                  <Icon style={{ color: "#fff" }}>arrow_back</Icon>
                                </IconButton>

                              </InputAdornment>
                            }
                        />
                      </FormControl>
                      <FormControl className={classes.form}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={this.handleChange.bind(this, 'password')}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword.bind(this)}
                                    onMouseDown={this.handleMouseDownPassword.bind(this)}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            }
                        />
                      </FormControl>
                      <ButtonLoading value="Sign In" className={classes.button} loadingColor={"primary"} onClick={this.handleSignInClick.bind(this)}/>
                      <Link href="#/signup" className={classes.link}>
                        Don't have an account? <b>SIGN UP</b>
                      </Link>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={this.state.snackOpen}
                            autoHideDuration={6000}
                            onClose={this.handleCloseSnackBar}
                        >
                            <SnackbarContentWrapper
                                onClose={this.handleCloseSnackBar}
                                variant={this.state.snackColor}
                                message={this.state.snackText}
                            />
                        </Snackbar>
                    </form>
                  </Grid>
                </Grid>
            </ThemeProvider>

        );
  }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Login);

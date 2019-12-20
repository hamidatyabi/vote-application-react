import React, { Component } from 'react';
import {Container} from "@material-ui/core";
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
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Logo from "../../assets/images/logo.png";

const classes = {
  baseContainer: {
    backgroundColor: '#1de9b6',
    padding: '0'
  },
  header: {
    padding: 20,
    minHeight: '30vh',
    backgroundColor: '#1de9b6'
  },
  footer: {
    padding: 20,
    minHeight: '70vh',
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
  }
}
class SignUp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showPassword: false,
      password: '',
      repeatPassword: '',
      username: '',
      fullname: '',
      email: '',
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
  handleSignUpClick = (event) => {
    event.preventDefault();
  }

  render() {
    const {loading} = this.state;
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
                    style={classes.header} >
                <Grid item xs={12}>
                  <img src={Logo} width={'100%'}/>
                </Grid>

              </Grid>
              <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={classes.footer} >
                <form noValidate autoComplete="off">
                  <FormControl style={classes.form}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        id="username"
                        type={'text'}
                        value={this.state.username}
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
                  <FormControl style={classes.form}>
                    <InputLabel htmlFor="username">Fullname</InputLabel>
                    <Input
                        id="fullname"
                        type={'text'}
                        value={this.state.fullname}
                        onChange={this.handleChange.bind(this, 'fullname')}
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
                  <FormControl style={classes.form}>
                    <InputLabel htmlFor="username">Email</InputLabel>
                    <Input
                        id="email"
                        type={'text'}
                        value={this.state.email}
                        onChange={this.handleChange.bind(this, 'email')}
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
                  <FormControl style={classes.form}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange.bind(this, 'password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword.bind(this)}
                                onMouseDown={this.handleMouseDownPassword.bind(this)}
                            >
                              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                    />
                  </FormControl>
                  <FormControl style={classes.form}>
                    <InputLabel htmlFor="standard-adornment-password">Repeat-Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.repeatPassword}
                        onChange={this.handleChange.bind(this, 'repeatPassword')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword.bind(this)}
                                onMouseDown={this.handleMouseDownPassword.bind(this)}
                            >
                              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                    />
                  </FormControl>
                  <Button variant="contained" color="primary" className="login-btn">
                    Sign Up
                  </Button>
                  <Link href="#/login" style={classes.link}>
                    Already you have an account? <b>SIGN IN</b>
                  </Link>
                </form>
              </Grid>
            </Grid>
        </ThemeProvider>

    );
  }
}

export default SignUp;

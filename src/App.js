import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect  } from 'react-router-dom';
import './App.css';
import DataStore from './services/storage/DataStore';
import AuthenticationService from "./services/service/AuthenticationService";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Login = React.lazy(() => import('./views/Login/Login'));
const SignUp = React.lazy(() => import('./views/Login/SignUp'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isAuth: DataStore.get('auth') !== null
        };
    }
    componentDidMount(){

    }
    isAuth = () => {
        var info = DataStore.get("auth");
        if (info === undefined || info === null || !info){
            this.setState({
                isAuth: false
            });
            return;
        }
        var {access_token, refresh_token} = info;
        if (access_token === undefined || refresh_token === undefined || access_token === null || refresh_token === null){
            this.setState({
                isAuth: false
            });
            return;
        }
        return AuthenticationService.getUserData(access_token, refresh_token).then(response => {
            if(response.status === 200){
                DataStore.clear();
                DataStore.set("profile_info", response.result);
                this.setState({
                    isAuth: true
                });
            }else{
                DataStore.clear();
                this.setState({
                    isAuth: false
                });
            }


        });
    }

    signOut = () => {
        DataStore.clear();
        this.setState({
            isAuth: false
        });
    }
    render() {
        const {isAuth} = this.state;
        return (
            <HashRouter>
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route path="/login" name="Login"
                               render={(props) => (
                                   (isAuth)?(<Redirect to="/dashboard" />):(<Login {...props} {...{isAuth: this.isAuth }} />)
                               )}
                        />
                        <Route path="/signup" name="SignUp"
                               render={(props) => (
                                   <SignUp {...props} {...{isAuth: this.isAuth}} />
                               )}
                        />
                        <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                        <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                        <Route path="/" name="Home" render={props => (
                                (!isAuth)?(<Redirect to="/login" />):(<DefaultLayout isAuth={isAuth} signOut={this.signOut}  {...props}/>)
                            )}
                        />
                    </Switch>
                </React.Suspense>
            </HashRouter>
        );
    }
}

export default App;

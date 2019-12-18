import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';

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
            isAuth: true
        };
    }
    componentDidMount(){

    }
    render() {
        const {isAuth} = this.state;
        return (
            <HashRouter>
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route path="/login" name="Login"
                               render={(props) => (
                                   <Login {...props} {...{isAuth: this.isAuth}} />
                               )}
                        />
                        <Route path="/signup" name="SignUp"
                               render={(props) => (
                                   <SignUp {...props} {...{isAuth: this.isAuth}} />
                               )}
                        />
                        <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                        <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                        <Route path="/" name="Home" render={props => <DefaultLayout isAuth={isAuth}  {...props}/>} />
                    </Switch>
                </React.Suspense>
            </HashRouter>
        );
    }
}

export default App;

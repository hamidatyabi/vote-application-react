import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const Config = {
    environment: process.env.REACT_APP_ENVIRONMENT,
    microservices: {
        authentication:{
            url: process.env.REACT_APP_AUTH_URL,
            clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
            clientSecret: process.env.REACT_APP_AUTH_CLIENT_SECRET,
        }
    },
    theme: createMuiTheme({
        palette: {
            primary: {
                light: '#82b1ff',
                main: '#2979ff',
                dark: '#2962ff',
                contrastText: '#fff',
            },
            secondary: green,
        },
        status: {
            danger: 'orange',
        },
    }),
    routes: {
        token: 'oauth/token',
        tokenInfo : 'token_info',
    }
};
export default Config;
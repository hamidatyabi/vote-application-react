import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const Config = {
    environment: 'development',
    api:{
        development: {
            url: 'http://192.168.56.102:9590/'
        },
        production: {
            url: 'http://192.168.56.102:9590/'
        }
    },
    oauth2:{
        development: {
            clientId: 'client',
            clientSecret: '123456',
        },
        production: {
            clientId: 'client',
            clientSecret: '123456',
        },
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
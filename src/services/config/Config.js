import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const Config = {
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
    })
};
export default Config;
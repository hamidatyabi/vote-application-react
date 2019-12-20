import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";

const useStyles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});
class ButtonLoading extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            success: false
        };
    }
    setLoading = (value) => {
        this.setState({
            loading : value
        })
    }
    setSuccess = (value) => {
        this.setState({
            success : value
        })
    }
    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setSuccess(false);
            this.setLoading(true);
            this.props.onClick(this.handleButtonClickCallback);
        }
    };
    handleButtonClickCallback = () => {
        this.setSuccess(true);
        this.setLoading(false);
    };
    render() {
        const {classes} = this.props;
        const {loading} = this.state;
        return (
            <div className={classes.root}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={this.handleButtonClick.bind(this)}
                    className={this.props.className}
                >
                    {this.props.value}
                </Button>
                {loading && <CircularProgress size={24} color={this.props.loadingColor} className={classes.buttonProgress} />}
            </div>
        );
    }
}
ButtonLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(ButtonLoading);
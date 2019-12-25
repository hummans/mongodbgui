import React, {Component, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link, Redirect  } from 'react-router-dom';
import Copyright from './Copyright';
import SignInStyle from '../Styles/SnackBar'
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import clsx from 'clsx';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import 'bootstrap/dist/css/bootstrap.css'

const useStyles = makeStyles(SignInStyle);

export default class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false
        };

    }


    render() {
        return (
            <ConnectionString type={this.props.match.params.connection}/>
        );
    }
}

function ConnectionString() {
    const classes = useStyles();
    const [connectionString, setConnectionString] = useState(null);
    const [response, setResponse] = useState(null);
    const [isResponse, setIsResponse] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const showResponse = () => {
        console.log(response);
        if(isResponse){
            if(response !== null){
                if(response === 'ok'){
                    return (
                        <Redirect to='/mongo/dashboard'  />
                    )
                } else {
                    const variantIcon = {
                        warning: WarningIcon,
                        error: ErrorIcon,
                    };
                    const Icon = variantIcon['error'];
                    return (
                        <SnackbarContent
                            aria-describedby="client-snackbar"
                            className={clsx(classes.error, classes.mt5)}
                            message={
                                <span id="client-snackbar" className={"display: 'flex', alignItems:'center'"}>
                                    <Icon className={clsx(classes.iconVariant)} />
                                    {'Error: Invalid connections string format, a valid format is available in your mongoDB Atlas cluster'}
                                </span>
                            }
                        />
                    )
                }
            }
        }
    };

    const loadProgressBar = () => {
        if(isSubmit){
            return (
                <LinearProgress color="secondary" />
            )
        }
    };

    const submit = (e)=> {
        e.preventDefault();
        setIsSubmit(true);
        axios
            .post(
                "/auth/check",
                {url:  connectionString},
            )
            .then(response => {
                setResponse(response.data.status);
                setIsResponse(true);
                setIsSubmit(false);
            })
            .catch(error => {
                setResponse(error);
                setIsSubmit(false);
            });
    };
    /*mongodb+srv://root:1234@cluster0-cgtwf.mongodb.net/test?retryWrites=true&w=majority */
    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            {loadProgressBar()}
            {showResponse()}
            <Grid container justify="flex-start" className='mt-4'>
                <Grid item>
                    <Link to={'/'} variant="h5">
                        <IconButton>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Link>
                </Grid>
            </Grid>
            <div className={classes.paper}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Connection string
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e) => {submit(e)}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        label="URL"
                        name="text"
                        autoComplete="text"
                        autoFocus
                        onChange={e => setConnectionString(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Connect
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
